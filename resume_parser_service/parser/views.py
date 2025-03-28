from django.shortcuts import render
import logging
import tempfile
import os
from resume_parser import resumeparse
import spacy
import pdfplumber
import re

logger = logging.getLogger(__name__)

def extract_basic_info(text):
    """Fallback text analysis when resume-parser fails"""
    return {
        'emails': list(set(re.findall(r'[\w\.-]+@[\w\.-]+', text))),
        'phones': list(set(re.findall(r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4})', text))),
        'education': [s.strip() for s in text.split('\n') if 'education' in s.lower()],
        'experience': [s.strip() for s in text.split('\n') if 'experience' in s.lower()],
        'skills': [s.strip() for s in text.split('\n') if 'skill' in s.lower()],
        'raw_text': text
    }

def upload_resume(request):
    context = {'parsed_data': None, 'error': None}
    
    if request.method == "POST" and request.FILES.get("file"):
        try:
            # Use temporary file that auto-deletes
            with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp_file:
                # Save uploaded file
                for chunk in request.FILES["file"].chunks():
                    tmp_file.write(chunk)
                tmp_path = tmp_file.name
            
            try:
                # Try with default spaCy model
                nlp = spacy.load("en_core_web_sm")
                context['parsed_data'] = resumeparse.read_file(tmp_path, nlp=nlp)
                
            except Exception as parser_error:
                logger.warning(f"Parser failed, using fallback: {parser_error}")
                
                # PDF text extraction fallback
                try:
                    with pdfplumber.open(tmp_path) as pdf:
                        text = "\n".join(page.extract_text() or "" for page in pdf.pages)
                    context['parsed_data'] = extract_basic_info(text)
                    context['warning'] = "Used basic text extraction"
                
                except Exception as pdf_error:
                    logger.error(f"PDF extraction failed: {pdf_error}")
                    context['error'] = f"Failed to process resume: {pdf_error}"
            
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
                
        except Exception as e:
            logger.error(f"File handling failed: {e}")
            context['error'] = f"File upload failed: {str(e)}"

            if 'tmp_path' in locals() and os.path.exists(tmp_path):
                os.unlink(tmp_path)

    return render(request, "upload.html", context)