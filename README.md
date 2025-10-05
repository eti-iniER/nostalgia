# 📸 Nostalgia

A modern web application for creating and sharing interactive memory collections. Built with Django REST Framework and React, Nostalgia allows users to create beautiful, shareable memories with multiple frames containing text and images.

## ✨ Features

- 🎨 **Memory Editor**: Create and edit memories with multiple frames
- 📝 **Rich Content**: Support for text and image frames
- 🔗 **Shareable**: Generate unique URLs for your memories
- 🔒 **Privacy Options**: Public or password-protected memories
- 🖼️ **Image Management**: Upload and organize images within frames
- 📱 **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS

## 🛠️ Tech Stack

### Backend

- **Django 5.2** - Python web framework
- **Django REST Framework** - RESTful API
- **django-cors-headers** - CORS handling
- **djangorestframework-simplejwt** - JWT authentication
- **drf-spectacular** - API documentation
- **Pillow** - Image processing

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router 7** - Navigation
- **TanStack Query** - Data fetching
- **Tailwind CSS 4** - Styling
- **Radix UI** - UI components
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 🚀 Getting Started

### Prerequisites

- **Python 3.13+**
- **Node.js 18+** and npm
- **uv** (Python package manager)

### Backend Setup

1. Navigate to the backend directory:

    ```powershell
    cd src/backend
    ```

2. Create a virtual environment using `uv`:

    ```powershell
    uv venv
    ```

3. Activate the virtual environment:

    ```powershell
    .venv\Scripts\Activate.ps1
    ```

4. Install dependencies:

    ```powershell
    uv pip install -e .
    ```

5. Run database migrations:

    ```powershell
    cd nostalgia
    python manage.py migrate
    ```

6. Start the Django development server:
    ```powershell
    python manage.py runserver
    ```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

    ```powershell
    cd src/frontend/nostalgia
    ```

2. Install dependencies:

    ```powershell
    npm install
    ```

3. Start the development server:
    ```powershell
    npm run dev
    ```

The frontend will be available at `http://localhost:5173` (or another port if 5173 is in use)

## 📁 Project Structure

```
nostalgia/
├── src/
│   ├── backend/
│   │   ├── nostalgia/          # Django project
│   │   │   ├── api/            # API endpoints
│   │   │   ├── core/           # Core models (Memory, Frame, FrameImage)
│   │   │   └── nostalgia/      # Project settings
│   │   ├── pyproject.toml      # Python dependencies
│   │   └── compose.yaml        # Docker Compose config
│   └── frontend/
│       └── nostalgia/
│           ├── src/
│           │   ├── api/        # API client and hooks
│           │   ├── app/        # Page components
│           │   ├── components/ # Reusable UI components
│           │   ├── contexts/   # React contexts
│           │   ├── hooks/      # Custom React hooks
│           │   ├── layouts/    # Layout components
│           │   └── lib/        # Utility functions
│           └── package.json    # Node dependencies
```

## 🗄️ Database Models

- **Memory**: Main container for a collection of frames
    - Title, description, slug
    - Public/private visibility
    - Optional password protection

- **Frame**: Individual content blocks within a memory
    - Type (text or image)
    - Prompt and content
    - Ordering

- **FrameImage**: Images attached to frames
    - Image file
    - Caption and alt text

## 🔌 API Endpoints

The backend provides RESTful API endpoints for:

- Creating and managing memories
- CRUD operations on frames
- Image upload and management
- Authentication and authorization

API documentation is available via drf-spectacular when the server is running.

## 🧪 Development

### Backend

Run the development server with hot reload:

```powershell
python manage.py runserver
```

### Frontend

Run with hot module replacement:

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Preview production build:

```powershell
npm run preview
```

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🏆 Hackathon Project

This project was built for the ACTA 24-hour Global Hackathon (Oct 4-5, 2025). See [RULES.md](RULES.md) for hackathon rules and requirements.

---

Built with ❤️ using Django and React
