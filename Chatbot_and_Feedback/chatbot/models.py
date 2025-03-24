from django.db import models

class Feedback(models.Model):
    recruiter_name = models.CharField(max_length=255)
    candidate_id = models.CharField(max_length=100)
    job_id = models.CharField(max_length=100)
    is_correct_match = models.BooleanField()
    score_accuracy = models.IntegerField()
    missing_skills = models.TextField(blank=True)
    comments = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback by {self.recruiter_name} on candidate {self.candidate_id}"
