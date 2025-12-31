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
├── .github/
│   └── copilot-instructions.md   # AI coding guidelines
├── packages/
│   ├── frontend/                 # React frontend (Vite + TypeScript)
│   │   ├── src/
│   │   │   ├── base/            # Base components (CButton, CCard)
│   │   │   ├── shared/          # Shared components (CMainLayout)
│   │   │   ├── modules/         # Feature modules
│   │   │   │   ├── questions/  # Q&A system
│   │   │   │   ├── advice/     # Advice sharing
│   │   │   │   └── ...         # Other modules
│   │   │   ├── services/       # Firebase services
│   │   │   ├── models/         # TypeScript models
│   │   │   └── locales/        # i18n (en, tr)
│   │   ├── public/             # Static assets
│   │   ├── firebase.ts         # Firebase client config
│   │   └── README.md           # Frontend documentation
│   │
│   └── backend/                 # Firebase backend configuration
│       ├── firebase.json        # Firebase config
│       ├── firestore.rules      # Database security rules
│       ├── storage.rules        # Storage security rules
│       ├── .firebaserc          # Firebase project config
│       ├── src/                 # Future Node.js server
│       └── README.md            # Backend documentation
│
├── package.json                 # Root workspace scripts
└── README.md                    # This file
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
- **Firebase** - Backend as a Service
  - **Firestore** - NoSQL database
  - **Firebase Auth** - User authentication  
  - **Firebase Storage** - File storage
  - **Firebase Hosting** - Frontend deployment
- **Node.js** - Runtime (planned for future custom server)
- **TypeScript** - Type safety

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
# Build both frontend and backend
npm run build

# Build frontend only
cd packages/frontend
npm run build

# Build backend only (currently minimal)
cd packages/backend
npm run build
```

## 🚀 Deployment

### Firebase Deployment

From the root directory:

```bash
# Deploy everything (hosting + firestore + storage)
npm run deploy

# Deploy only frontend hosting
npm run deploy:hosting

# Deploy only Firestore rules
npm run deploy:firestore
```

### Prerequisites

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
firebase login
```

2. Initialize Firebase (already configured in `packages/backend/`):
```bash
cd packages/backend
firebase use --add  # Select your Firebase project
```

### Production Build Output
- Frontend: `packages/frontend/dist/` (deployed to Firebase Hosting)
- Backend: Firebase configuration in `packages/backend/`

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
