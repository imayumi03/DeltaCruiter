from django.db import models

# Create your models here.
class Candidate(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    status = models.CharField(max_length=20)
    applied = models.DateField()
    experience = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Job(models.Model):
    title = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    job_type = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    posted = models.DateField(auto_now_add=True)
    applicants = models.IntegerField(default=0)
    status = models.CharField(max_length=20)

    def __str__(self):
        return self.title