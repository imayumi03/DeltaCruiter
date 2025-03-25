from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CandidateViewSet, JobViewSet

router = DefaultRouter()
router.register(r'candidates', CandidateViewSet)
router.register(r'jobs', JobViewSet)

urlpatterns = [
    path('', include(router.urls)),
]