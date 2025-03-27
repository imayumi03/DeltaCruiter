import spacy
nlp = spacy.load("en_core_web_sm")

def parse_job_description(text: str) -> dict:
    doc = nlp(text)
    # Extracting NER
    parsed_data = {"entities": [(ent.text, ent.label_) for ent in doc.ents]}
    return parsed_data