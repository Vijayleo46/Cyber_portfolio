import os
import django
import sys

# Add the project directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from api.models import Project, Experience, Education, Skill, SkillCategory, ContactInfo

def seed_data():
    # Projects
    projects_data = [
        {
            "title": "Future Assistant",
            "description": "AI-Powered Virtual Assistant with Voice Recognition.",
            "technologies": ["Python", "AI", "Speech Recognition", "NLP"],
            "image": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
            "demo_url": "https://future-assistant.vercel.app/",
            "github_url": "https://github.com/Vijayleo46/Future-Assistant",
            "features": [
                "Voice-activated AI assistant with natural language processing.",
                "Performs tasks like web searches, weather updates, and automation.",
                "Live demo available with interactive voice commands."
            ]
        },
        {
            "title": "MindCanvas",
            "description": "Time Memory Engine & Prediction System.",
            "technologies": ["AI", "React", "Node.js"],
            "image": "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop",
            "features": [
                "Store, explore, and predict memories across a 300-year timeline.",
                "Unique interface for memory visualization and time travel."
            ]
        },
        {
            "title": "IntelliMeal",
            "description": "AI-Powered Food Recognition & Calorie Tracker.",
            "technologies": ["AI", "Computer Vision", "React"],
            "image": "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1965&auto=format&fit=crop",
            "features": [
                "Upload food photos to instantly recognize dishes.",
                "Smart calorie breakdown (Protein, Fat, Carbs) and tracking."
            ]
        },
        {
            "title": "Bun & Chai Hub",
            "description": "Platform for Kerala's Café Culture.",
            "technologies": ["React", "Tailwind CSS"],
            "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop",
            "features": [
                "Discover Bun Maska, Irani Chai, and trending spots in Kerala.",
                "Explore cafes and trending food items near you."
            ]
        },
        {
            "title": "Restaurant Menu System",
            "description": "Modern Online Menu & Cart System.",
            "technologies": ["React", "Stripe Integration"],
            "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
            "features": [
                "Responsive digital menu with category filtering.",
                "Full cart functionality with total calculation and checkout UI."
            ]
        },
        {
            "title": "DreamRoom AI",
            "description": "AI-Driven 3D Room Visualization.",
            "technologies": ["Stable Diffusion", "LoRA", "Python"],
            "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
            "features": [
                "Generates 3D room layouts from text and floor plans.",
                "Used Diffusion Models + LoRA for realistic designs."
            ]
        },
        {
            "title": "VitalMed",
            "description": "Medical Equipment E-Commerce.",
            "technologies": ["Python", "Django"],
            "image": "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop",
            "features": [
                "Role-based system for Admin, Shops, and Users.",
                "Secure shop registration and product management."
            ]
        },
        {
            "title": "AgriNova",
            "description": "Cross-platform Agricultural Marketplace built with Flutter & Dart.",
            "technologies": ["Flutter", "Dart", "Firebase"],
            "image": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
            "features": [
                "Native performance on both iOS and Android using Flutter framework.",
                "Real-time data synchronization with Firebase backend.",
                "Integrated secure payments, order tracking, and delivery management."
            ]
        },
         {
            "title": "CivicConnect",
            "description": "Public Complaint Management System.",
            "technologies": ["Python", "Django"],
            "image": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop",
            "features": [
                "Admin panel to manage places, departments, and complaints.",
                "Public module for citizens to register and track complaints."
            ]
        },
    ]

    for p in projects_data:
        Project.objects.update_or_create(
            title=p['title'],
            defaults={
                'description': p['description'],
                'technologies': p['technologies'],
                'image': p['image'],
                'demo_url': p.get('demo_url'),
                'github_url': p.get('github_url'),
                'features': p['features']
            }
        )

    # Experience
    exp_data = [
        {
            "role": "App Developer",
            "company": "SYSDEVCODE",
            "period": "Dec 2025 - Present",
            "details": [
                "Joining as an App Developer to build innovative mobile and web solutions.",
                "Specializing in application development cycles and system architecture.",
                "Contributing to core software projects starting from December 2025."
            ]
        },
        {
            "role": "AI Software Developer Intern",
            "company": "AIXE Labs Private Limited",
            "period": "Oct 2025 - Present",
            "details": [
                "Developing creative, intelligent, and scalable solutions for Artograph AI.",
                "Working on a next-generation AI platform utilizing React.js and modern web stacks.",
                "Collaborating in a remote environment to deliver innovative AI-driven features."
            ]
        },
        {
            "role": "Full Stack Developer Intern",
            "company": "NoviTech R&D Pvt Ltd, Chennai",
            "period": "May 2025 – June 2025",
            "details": [
                "Gained hands-on experience in frontend, backend, and database integration.",
                "Built and deployed end-to-end web applications using modern frameworks."
            ]
        },
        {
            "role": "Flutter Developer Advance Intern",
            "company": "Spectrum Software Solutions, Kochi",
            "period": "July 2024 – Aug 2024",
            "details": [
                "Developed and optimized cross-platform apps with Flutter & Firebase.",
                "Implemented UI/UX enhancements, authentication, and API integrations."
            ]
        },
        {
            "role": "Flutter Developer Intern",
            "company": "Spectrum Software Solutions, Kochi",
            "period": "Jun 2023 – Jul 2023",
            "details": [
                "Built responsive mobile apps with Flutter for both Android and iOS platforms.",
                "Reduced development time by using a single codebase across platforms."
            ]
        },
    ]
    for e in exp_data:
        Experience.objects.update_or_create(
            role=e['role'],
            company=e['company'],
            defaults={'period': e['period'], 'details': e['details']}
        )

    # Education
    edu_data = [
        {
            "degree": "B.E. Computer Science Engineering",
            "institution": "Anna University",
            "period": "Sep 2021 - June 2025",
            "details": [
                "Specialized in software development and AI integration.",
                "Focused on system architecture and scalable solutions."
            ]
        },
        {
            "degree": "Vocational Higher Secondary",
            "institution": "Higher Secondary School",
            "period": "June 2019 - Mar 2021",
            "details": [
                "Focused on programming fundamentals (CS & IT)."
            ]
        },
    ]
    for edu in edu_data:
        Education.objects.update_or_create(
            degree=edu['degree'],
            institution=edu['institution'],
            defaults={'period': edu['period'], 'details': edu['details']}
        )

    # Skills
    skills_data = [
        {
            "name": "Languages",
            "skills": [
                {"name": "Python", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", "level": 90, "desc": "Expert in Django, Flask, AI/ML libraries, and automation scripts."},
                {"name": "Dart", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", "level": 88, "desc": "Advanced Flutter development with state management and native integrations."},
                {"name": "C++", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", "level": 75, "desc": "Strong foundation in algorithms, data structures, and system programming."},
                {"name": "Java", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", "level": 70, "desc": "Object-oriented programming and Android development experience."},
                {"name": "JavaScript", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", "level": 85, "desc": "Modern ES6+, async programming, and full-stack JavaScript development."},
                {"name": "SQL", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", "level": 80, "desc": "Database design, complex queries, optimization, and stored procedures."}
            ]
        },
        {
            "name": "Frameworks & Tech",
            "skills": [
                {"name": "Django", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", "level": 88},
                {"name": "Flutter", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", "level": 92},
                {"name": "React", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", "level": 87},
                {"name": "Next.js", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", "level": 82},
                {"name": "Node.js", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", "level": 83},
                {"name": "Three.js", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", "level": 72},
                {"name": "Tailwind", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", "level": 90}
            ]
        },
        {
            "name": "Databases & Cloud",
            "skills": [
                {"name": "Supabase", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", "level": 85},
                {"name": "MySQL", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", "level": 82},
                {"name": "SQLite", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", "level": 78},
                {"name": "Firebase", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg", "level": 88}
            ]
        },
        {
            "name": "Tools",
            "skills": [
                {"name": "Git", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", "level": 90},
                {"name": "Figma", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", "level": 80}
            ]
        }
    ]
    for cat in skills_data:
        category, _ = SkillCategory.objects.get_or_create(name=cat['name'])
        for s in cat['skills']:
            Skill.objects.update_or_create(
                name=s['name'],
                category=category,
                defaults={'logo': s['logo'], 'level': s['level'], 'desc': s.get('desc')}
            )

    # Contact Info
    ContactInfo.objects.update_or_create(
        email="vijaymartin72@gmail.com",
        defaults={
            "name": "VIJAY MARTIN",
            "job_title": "Software Developer",
            "phone": "+91 7736472576",
            "location": "Kochi, Kerala, India",
            "linkedin": "https://linkedin.com/in/vijay-martin-86b430232",
            "github": "https://github.com/Vijayleo46",
            "twitter": "https://twitter.com/vijaymartin",
            "dribbble": "https://dribbble.com/vijaymartin"
        }
    )

    # Create superuser
    from django.contrib.auth.models import User
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print("Superuser created: admin / admin123")

    print("Comprehensive seeding complete.")

if __name__ == '__main__':
    seed_data()
