# VIJAY MARTIN | Software Developer Portfolio

A premium, interactive portfolio website featuring a cyber-themed laptop mockup, advanced GSAP scroll animations, and a sleek, modern aesthetic.

## 🚀 Features
- **Interactive Laptop Mockup**: A central UI hub showcasing core stats and technical specifications.
- **Scroll-Linked Animations**: Advanced GSAP effects that bring the UI to life as you navigate.
- **Dynamic Portrait**: Responsive profile image with background transparency and interaction states.
- **Project Registry**: A horizontal-scrolling showcase of full-stack and AI-driven projects.
- **Live Chat Sim**: Integrated AI/terminal-style chat interface for engagement.

## 🛠️ Tech Stack
- **Frontend**: React.js 19, TypeScript
- **Backend**: Django 4.2, Django REST Framework
- **Animations**: GSAP (ScrollTrigger), Framer Motion, Anime.js
- **Styling**: Vanilla CSS (Custom Design System)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API Client**: Axios

## 📦 Local Setup

### Backend Setup (Django)
1. Navigate to the backend directory: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run migrations: `python manage.py migrate`
6. Create a superuser (optional): `python manage.py createsuperuser`
7. Start the backend server: `python manage.py runserver`
   - Backend will run on [http://localhost:8000](http://localhost:8000)
   - Admin panel: [http://localhost:8000/admin](http://localhost:8000/admin)

### Frontend Setup (React + Vite)
1. Return to the root directory: `cd ..`
2. Install dependencies: `npm install`
3. The frontend is configured to connect to `http://localhost:8000/api` in development (via `.env.development`)
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables
- **Frontend**: `.env.development` is already configured for local development
- **Backend**: Set `SAMBANOVA_API_KEY` in your environment for the chatbot feature (optional)
  - Windows: `$env:SAMBANOVA_API_KEY="your-key-here"`
  - Mac/Linux: `export SAMBANOVA_API_KEY="your-key-here"`

### Adding Portfolio Data
Visit the Django admin panel at [http://localhost:8000/admin](http://localhost:8000/admin) to add:
- Projects
- Experience
- Education
- Skills
- Contact Information

## 📄 Customization
- **Resume**: Place your `resume.pdf` in the `/public` folder to enable the download feature.
- **Portrait**: Replace `public/vijay.png` with your own backgroundless image.

## 🌐 Deployment
Optimized for **Render** with separate frontend and backend services.

### Frontend (Static Site)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment Variable**: `VITE_API_URL` (automatically injected from backend service)

### Backend (Web Service)
- **Build Command**: `./build.sh`
- **Start Command**: `python -m gunicorn portfolio_backend.wsgi:application --bind 0.0.0.0:$PORT`
- **Environment Variables**: 
  - `SECRET_KEY` (auto-generated)
  - `DEBUG=False`
  - `SAMBANOVA_API_KEY` (for chatbot feature)
