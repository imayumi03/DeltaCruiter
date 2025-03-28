import fitz
from docx import Document

# Extract text from PDF using PyMuPDF
def extract_text_from_pdf(file):
    try:
        with fitz.open(stream=file.read(), filetype="pdf") as pdf_reader:
            text = "\n".join([page.get_text() for page in pdf_reader])
        return text
    except Exception as e:
        raise ValueError(f"Error extracting text from PDF: {str(e)}")

# Extract text from DOCX using python-docx
def extract_text_from_docx(file):
    try:
        doc = Document(file)
        text = "\n".join([para.text for para in doc.paragraphs])
        return text
    except Exception as e:
        raise ValueError(f"Error extracting text from DOCX: {str(e)}")

# Send extracted text to GPT-3.5 for parsing
# def parse_resume_with_gpt(resume_text):
#     try:
#         prompt = f"""
#         Extract key details from the following resume in a structured JSON format with fields:
#         name, email, phone, skills, experience, education.

#         Resume:
#         {resume_text}

#         Output:
#         {{
#             "name": "John Doe",
#             "email": "johndoe@example.com",
#             "phone": "+1234567890",
#             "skills": ["Python", "Django", "Machine Learning"],
#             "experience": [
#                 {{"role": "Software Engineer", "company": "XYZ Corp", "years": "2019-2023"}}
#             ],
#             "education": [
#                 {{"degree": "BSc Computer Science", "university": "ABC University", "years": "2015-2019"}}
#             ]
#         }}
#         """
        
#         response = openai.ChatCompletion.create(
#             model="gpt-3.5-turbo",  # GPT-3.5 model
#             messages=[{"role": "system", "content": "You are an expert in parsing resumes."},
#                       {"role": "user", "content": prompt}],
#             temperature=0.5
#         )

#         result = response.get("choices", [{}])[0].get("message", {}).get("content", None)
        
#         if not result:
#             raise ValueError("No result found in the GPT response.")
        
#         # Parse the result as a JSON object
#         parsed_result = json.loads(result)
#         return parsed_result

#     except openai.error.OpenAIError as e:
#         raise ValueError(f"Error communicating with OpenAI API: {str(e)}")
#     except json.JSONDecodeError as e:
#         raise ValueError(f"Error parsing GPT response: {str(e)}")
#     except Exception as e:
#         raise ValueError(f"Error parsing resume with GPT: {str(e)}")
