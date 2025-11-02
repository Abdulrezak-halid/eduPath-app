# 🎓 EduPath

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/Material_UI-5.0.0-blue.svg)](https://mui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

EduPath is a comprehensive educational platform designed to guide students through their academic journey, providing valuable resources, tools, and support for university success.

## 🌟 Features

- **Academic Planning**
  - Strategic course selection
  - Study schedule planning
  - Exam preparation guides
  - Academic progress tracking

- **Career Guidance**
  - Career path exploration
  - Interview preparation tips
  - Resume writing guidance
  - Professional development resources

- **University Life**
  - Campus life guidance
  - Student organization information
  - Time management tips
  - Social integration support

- **Study Skills**
  - Effective reading strategies
  - Note-taking methods
  - Memory enhancement techniques
  - Exam preparation strategies

- **Personal Development**
  - Leadership skills development
  - Communication skills enhancement
  - Self-improvement resources
  - Goal setting and tracking

- **Financial Planning**
  - Student budget management
  - Savings strategies
  - Expense tracking tools
  - Financial literacy resources

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://gitlab.com/Abdhalid/edupath-app.git
cd edupath-app
```

2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd packages/frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
```bash
# Frontend
cp packages/frontend/.env.example packages/frontend/.env

# Backend
cp packages/backend/.env.example packages/backend/.env
```

4. Start the development servers
```bash
# Start both frontend and backend in development mode
npm run dev
```

## 🏗️ Project Structure

```
edupath-app/
├── packages/
│   ├── frontend/           # React frontend application
│   │   ├── src/
│   │   │   ├── modules/    # Feature modules
│   │   │   ├── shared/     # Shared components and utilities
│   │   │   └── locales/    # i18n translation files
│   │   └── public/         # Static assets
│   │
│   └── backend/            # Node.js backend application
│       ├── src/
│       │   ├── controllers/
│       │   ├── models/
│       │   └── services/
│       └── tests/
└── docs/                   # Documentation
```

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI library
- **TypeScript** - Type safety and better developer experience
- **Material UI** - Component library and theming
- **i18next** - Internationalization
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime environment
- **TypeScript** - Type safety
- **Express.js** - Web framework
- **MongoDB** - Database
- **Jest** - Testing framework

## 🌐 Internationalization

EduPath currently supports:
- English (en)
- Turkish (tr)

To add a new language, create a translation file in `packages/frontend/src/locales/`.

## 🧪 Testing

```bash
# Run frontend tests
cd packages/frontend
npm test

# Run backend tests
cd packages/backend
npm test
```

## 📦 Building for Production

```bash
# Build frontend
cd packages/frontend
npm run build

# Build backend
cd packages/backend
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Thanks to all contributors who have helped shape EduPath into what it is today!

## 📞 Contact

- Email: contact@edupath.com
- Website: https://edupath.com
- LinkedIn: [EduPath](https://linkedin.com/company/edupath)

## 🚀 Roadmap

### Upcoming Features
- [ ] Interactive quizzes and assessments
- [ ] Student community forums
- [ ] Mobile application
- [ ] AI-powered study recommendations
- [ ] Virtual study groups
- [ ] Progress tracking dashboard

### Completed
- [x] Multi-language support
- [x] Module-based learning paths
- [x] Responsive design
- [x] User authentication
- [x] Basic content management

## 🔄 Project Status

EduPath is under active development with regular updates and new features being added. We welcome contributions from the community!
