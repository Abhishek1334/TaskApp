# 📝 Todo App - Full-Stack Task Manager

A modern, responsive full-stack Todo List application built by **Abhishek Rajoria**. Features a clean, intuitive interface with real-time task management capabilities, dark mode support, and professional UI/UX design.

> 👤 **Developed by:** [Abhishek Rajoria](https://abhishek-rajoria.vercel.app/)  
> 🔗 **GitHub:** [@Abhishek1334](https://github.com/Abhishek1334)  
> 🌐 **Portfolio:** [abhishek-rajoria.vercel.app](https://abhishek-rajoria.vercel.app/)

## 🌟 Features

### ✨ Frontend Features
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Real-time Updates**: Instant feedback for all task operations
- **Task Management**: Add, complete, and delete tasks seamlessly
- **Progress Tracking**: Visual progress bar and task statistics
- **Toast Notifications**: User-friendly success/error messages
- **Mobile-Friendly**: Fully responsive design for all devices
- **Loading States**: Smooth loading indicators for better UX
- **Error Handling**: Graceful error handling with retry functionality

### 🚀 Backend Features
- **RESTful API**: Clean, well-documented REST endpoints
- **Input Validation**: Robust validation using `class-validator`
- **Error Handling**: Comprehensive error responses
- **CORS Support**: Configured for frontend communication
- **Modular Architecture**: Clean separation of concerns with NestJS
- **In-Memory Storage**: Simple array-based storage (no database required)

## 🔧 Tech Stack

### Backend
- **Framework**: [NestJS](https://nestjs.com/) with TypeScript
- **Validation**: `class-validator` for input validation
- **Architecture**: Modular design with controllers, services, DTOs, and entities

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for modern, responsive design
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful, consistent icons
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/) for user feedback
- **API Communication**: Native Fetch API with custom error handling

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TaskApp
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm run install:all
   ```

3. **Start the development servers**
   ```bash
   # Start both backend and frontend concurrently
   npm run dev
   
   # Or start them individually:
   # Backend (port 3001)
   npm run dev:backend
   
   # Frontend (port 3000)  
   npm run dev:frontend
   ```

4. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:3001](http://localhost:3001)

### Manual Setup

If you prefer to set up each part individually:

#### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🛠 API Endpoints

### Tasks API
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Fetch all tasks |
| `GET` | `/tasks/:id` | Fetch a specific task |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update task completion status |
| `DELETE` | `/tasks/:id` | Delete a task |

### Request/Response Examples

#### Create Task
```bash
POST /tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "completed": false
}
```

#### Update Task
```bash
PUT /tasks/abc123
Content-Type: application/json

{
  "completed": true
}
```

## 📁 Project Structure

```
TaskApp/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── tasks/
│   │   │   ├── dto/         # Data Transfer Objects
│   │   │   │   ├── create-task.dto.ts
│   │   │   │   └── update-task.dto.ts
│   │   │   ├── entities/    # Task entity interface
│   │   │   │   └── task.entity.ts
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.service.ts
│   │   │   └── tasks.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # Next.js Frontend
│   ├── components/          # React components
│   │   ├── TaskItem.tsx
│   │   └── AddTaskForm.tsx
│   ├── pages/
│   │   ├── _app.tsx
│   │   └── index.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── types/               # TypeScript type definitions
│   │   └── task.ts
│   ├── utils/               # API utilities
│   │   └── api.ts
│   ├── package.json
│   └── tailwind.config.js
├── package.json             # Root workspace configuration
└── README.md
```

## 🎨 Design Highlights

- **Modern Color Scheme**: Professional blue and gray palette
- **Intuitive Interactions**: Hover effects, smooth transitions, and clear visual feedback
- **Accessibility**: Proper contrast ratios and keyboard navigation support
- **Component-Based**: Reusable, maintainable React components
- **TypeScript**: Full type safety across the entire application

## 🧪 Testing the Application

### Manual Testing Checklist
- [ ] Add a new task
- [ ] Mark task as complete/incomplete
- [ ] Delete a task
- [ ] Test responsive design on mobile/tablet
- [ ] Verify error handling (stop backend, try operations)
- [ ] Check toast notifications for all actions

### API Testing with curl
```bash
# Get all tasks
curl http://localhost:3001/tasks

# Create a task
curl -X POST http://localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task"}'

# Update task completion
curl -X PUT http://localhost:3001/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a task
curl -X DELETE http://localhost:3001/tasks/TASK_ID
```

## 🚀 Production Build

### Build both applications
```bash
npm run build
```

### Start production servers
```bash
npm run start:backend  # Starts backend on port 3001
npm run start:frontend # Starts frontend on port 3000
```

## 🔍 Key Implementation Details

### Backend Highlights
- **Validation**: Input validation using `class-validator` decorators
- **Error Handling**: Proper HTTP status codes and error messages
- **CORS Configuration**: Allows frontend communication from localhost:3000
- **Modular Design**: Clean separation using NestJS modules, services, and controllers

### Frontend Highlights
- **State Management**: React hooks for local state management
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Optimistic Updates**: Immediate UI updates with rollback on failure
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance**: Efficient re-rendering and minimal API calls

## 💡 Future Enhancements

- [ ] Add task categories/tags
- [ ] Implement task priorities
- [ ] Add due dates and reminders
- [ ] User authentication and multiple user support
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Task search and filtering
- [ ] Drag-and-drop task reordering
- [ ] Export tasks to CSV/JSON

## 👨‍💻 About the Developer

**Abhishek Rajoria** is a passionate Full-Stack Developer based in New Delhi, India 🇮🇳. Specializing in modern web technologies and creating scalable, user-friendly applications.

### 🔗 Connect with me:
- **Portfolio:** [abhishek-rajoria.vercel.app](https://abhishek-rajoria.vercel.app/)
- **GitHub:** [@Abhishek1334](https://github.com/Abhishek1334)
- **LinkedIn:** [Connect on LinkedIn](https://linkedin.com/in/abhishek-rajoria)
- **Email:** AbhishekRajoria24@gmail.com

### 🚀 Other Projects:
- **[MarketPulse](https://github.com/Abhishek1334/MarketPulse)** - Real-time stock analytics platform
- **[Festify](https://github.com/Abhishek1334/Festify)** - IoT-powered event management system
- **[TaskTracker](https://github.com/Abhishek1334)** - Full-stack task management application

## 📄 License

This project is created for portfolio and demonstration purposes.

---

**Built with ❤️ by [Abhishek Rajoria](https://abhishek-rajoria.vercel.app/) using modern web technologies**

*This application demonstrates proficiency in full-stack development, modern UI/UX design, and industry best practices.* 