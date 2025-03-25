from rest_framework import viewsets
from .models import Candidate, Job
from .serializers import CandidateSerializer, JobSerializer

class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer