import os
import openai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework import generics
from rest_framework.decorators import api_view
from .models import Project, Experience, Education, SkillCategory, ContactInfo, ChatMessage, ContactMessage
from .serializers import (
    ProjectSerializer, 
    ExperienceSerializer, 
    EducationSerializer, 
    SkillCategorySerializer, 
    ContactInfoSerializer,
    ChatMessageSerializer,
    ContactMessageSerializer
)

@api_view(['GET'])
def api_root(request):
    """
    Welcome to Vijay Martin's Portfolio API
    """
    return Response({
        'message': 'Welcome to Vijay Martin\'s Portfolio API',
        'version': '1.0',
        'endpoints': {
            'projects': '/api/projects/',
            'skills': '/api/skills/',
            'experience': '/api/experience/',
            'education': '/api/education/',
            'contact_info': '/api/contact-info/',
            'chatbot': '/api/chatbot/',
            'contact_messages': '/api/contact-messages/',
            'admin': '/admin/',
        },
        'documentation': 'Visit /api/ for API endpoints'
    })


class ContactMessageView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class ChatBotView(APIView):
    def post(self, request):
        user_text = request.data.get('text')
        if not user_text:
            return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Save user message
        ChatMessage.objects.create(role='user', text=user_text)

        try:
            # Configure SambaNova client
            client = openai.OpenAI(
                api_key=os.environ.get("SAMBANOVA_API_KEY"),
                base_url="https://api.sambanova.ai/v1",
            )

            # Prepare context from portfolio data
            context = "You are an AI assistant for Vijay Martin's portfolio. "
            context += f"Vijay is a {ContactInfo.objects.first().job_title if ContactInfo.objects.exists() else 'Software Developer'}. "
            
            # Simple retrieval for context
            projects = Project.objects.all()
            if projects.exists():
                context += "His projects include: " + ", ".join([p.title for p in projects]) + ". "
            
            response = client.chat.completions.create(
                model="Meta-Llama-3.1-8B-Instruct",
                messages=[
                    {"role": "system", "content": context},
                    {"role": "user", "content": user_text}
                ],
                temperature=0.1,
                top_p=0.1
            )
            
            ai_text = response.choices[0].message.content

            # Save AI response
            ChatMessage.objects.create(role='model', text=ai_text)

            return Response({
                "role": "model",
                "text": ai_text,
                "timestamp": ChatMessage.objects.last().timestamp
            })
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
