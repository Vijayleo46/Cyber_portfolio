from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet, 
    ExperienceViewSet, 
    EducationViewSet, 
    SkillCategoryViewSet, 
    ContactInfoViewSet,
    ChatBotView,
    ContactMessageView
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'experience', ExperienceViewSet)
router.register(r'education', EducationViewSet)
router.register(r'skills', SkillCategoryViewSet)
router.register(r'contact', ContactInfoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('chatbot/', ChatBotView.as_view(), name='chatbot'),
    path('contact-message/', ContactMessageView.as_view(), name='contact-message'),
]
