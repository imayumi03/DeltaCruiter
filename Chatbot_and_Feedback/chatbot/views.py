from django.shortcuts import render
from django.http import JsonResponse
from .api import get_gemini_response
from .models import Feedback

def chat_page(request):
    return render(request, "chatbot/chat.html")

def chat_api(request):
    if request.method == "POST":
        user_msg = request.POST.get("message")
        reply = get_gemini_response(user_msg)
        return JsonResponse({"response": reply})
    return JsonResponse({"error": "Invalid request"}, status=400)

def submit_feedback(request):
    if request.method == "POST":
        Feedback.objects.create(
            recruiter_name=request.POST.get("recruiter_name"),
            candidate_id=request.POST.get("candidate_id"),
            job_id=request.POST.get("job_id"),
            is_correct_match=(request.POST.get("is_correct_match") == "true"),
            score_accuracy=int(request.POST.get("score_accuracy")),
            missing_skills=request.POST.get("missing_skills", ""),
            comments=request.POST.get("comments", "")
        )
        return JsonResponse({"status": "Feedback saved"})
    return JsonResponse({"error": "Invalid request"}, status=400)
