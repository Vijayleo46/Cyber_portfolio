from rest_framework import viewsets
from .models import Project, Experience, Education, SkillCategory, ContactInfo
from .serializers import (
    ProjectSerializer, 
    ExperienceSerializer, 
    EducationSerializer, 
    SkillCategorySerializer, 
    ContactInfoSerializer
)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all().order_by('id')
    serializer_class = ExperienceSerializer

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class SkillCategoryViewSet(viewsets.ModelViewSet):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer

class ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
