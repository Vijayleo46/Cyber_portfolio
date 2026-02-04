from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField()
    demo_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    technologies = models.JSONField(default=list) # List of strings
    features = models.JSONField(default=list)     # List of strings

    def __str__(self):
        return self.title

class Experience(models.Model):
    role = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    period = models.CharField(max_length=100)
    details = models.JSONField(default=list) # List of strings

    def __str__(self):
        return f"{self.role} at {self.company}"

class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    period = models.CharField(max_length=100)
    details = models.JSONField(default=list) # List of strings

    def __str__(self):
        return self.degree

class SkillCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    logo = models.URLField()
    level = models.IntegerField(default=80)
    desc = models.TextField(blank=True, null=True)
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

class ContactInfo(models.Model):
    name = models.CharField(max_length=200, default="VIJAY MARTIN")
    job_title = models.CharField(max_length=200, default="Software Developer")
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    location = models.CharField(max_length=200)
    linkedin = models.URLField()
    github = models.URLField()
    twitter = models.URLField(blank=True, null=True)
    dribbble = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.email

class ChatMessage(models.Model):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('model', 'AI'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.role}: {self.text[:50]}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}: {self.subject or 'No Subject'}"
