from django.urls import path
from .views import chat_page, chat_api, submit_feedback

urlpatterns = [
    path('', chat_page, name="chat_page"),
    path('api/chat/', chat_api, name="chat_api"),
    path('api/feedback/', submit_feedback, name="submit_feedback"),
]