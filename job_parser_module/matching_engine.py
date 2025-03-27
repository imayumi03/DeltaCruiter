from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def match_candidate(candidate: dict, job_description: str) -> (float, dict):
    candidate_text = candidate.get("profile", "")
    texts = [job_description, candidate_text]
    
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(texts)
    score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0] * 100  

    details = {"note": "This is a simple similarity score based on text content."}
    return score, details