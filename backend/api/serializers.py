from rest_framework import serializers
from .models import Project, Experience, Education, Skill, SkillCategory, ContactInfo, ChatMessage, ContactMessage

class ProjectSerializer(serializers.ModelSerializer):
    demoUrl = serializers.URLField(source='demo_url', allow_blank=True, allow_null=True)
    githubUrl = serializers.URLField(source='github_url', allow_blank=True, allow_null=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image', 'demoUrl', 'githubUrl', 'technologies', 'features']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'skills']

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['role', 'text', 'timestamp']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
