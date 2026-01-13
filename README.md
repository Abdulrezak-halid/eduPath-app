# 🎓 EduPath

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/Material_UI-5.0.0-blue.svg)](https://mui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

EduPath is a comprehensive educational platform designed to guide students through their academic journey, providing valuable resources, tools, and support for university success.

## 🌟 Features

- **Academic Planning** 📚
- **Study Skills** 🎯
- **Career Guidance** 💼
- **University Life** 🎓
- **Personal Development** 🚀
- **Financial Planning** 💰

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
## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library with concurrent features
- **TypeScript 5** - Type safety and enhanced developer experience
- **Material UI v5** - Component library with comprehensive design system
  - Accordion, Stepper, Tabs, Cards, Progress bars
  - Avatar, Chip, Paper, Stack components
  - Responsive Grid and Layout system
- **Emotion** - CSS-in-JS styling solution
- **React Router v6** - Client-side routing and navigation
- **React i18next** - Internationalization (590+ translation keys)
- **Vite** - Lightning-fast build tool and dev server
- **Framer Motion** - Production-ready animation library
- **React Hook Form** - Performant form validation

### Backend
- **Firebase** - Backend as a Service (BaaS)
  - **Firestore** - Real-time NoSQL database
  - **Firebase Auth** - Email/password authentication
  - **Firebase Storage** - Secure file storage
  - **Firebase Hosting** - Global CDN deployment
  - **Security Rules** - Data access control
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe backend development

## � Design Philosophy

### Component Naming Convention
- All components start with **'C'** prefix (e.g., `CButton`, `CModuleCard`)
- Interfaces/Types start with **'I'** prefix (e.g., `ISkillStock`, `IChallenge`)
- Arrow functions are used consistently
- ESLint rules are strictly followed

### Module-Specific Design
Each educational module has a **unique visual identity**:
- **Academic Planning**: Tables with progress bars and time allocations
- **Study Skills**: Step-by-step Stepper components for methods
- **Career Guidance**: Accordion-based expandable guides
- **University Life**: Resource directory grid + Interactive priority matrix
- **Personal Development**: Stock market-style tracker + Gamification
- **Financial Planning**: Budget templates with percentage breakdowns

## 🌐 Internationalization

EduPath currently supports:
- **English (en)** - 590+ translation keys
- **Turkish (tr)** - 590+ translation keys

All UI text is fully translated including:
- Navigation, buttons, labels
- Module content and descriptions
- Tips, guides, and instructions
- Error messages and notifications

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

## � Project Statistics

- **Components**: 50+ React components
- **Translation Keys**: 590+ (EN/TR)
- **Modules**: 6 educational modules
- **Lines of Code**: 10,000+
- **Type Safety**: 100% TypeScript
- **Test Coverage**: Growing

## 📞 Contact

- **GitLab**: [EduPath Repository](https://gitlab.com/Abdhalid/edupath-app)
- **Developer**: Abdhalid
- **Issues**: [Report bugs or request features](https://gitlab.com/Abdhalid/edupath-app/-/issues)

## 🚀 Roadmap

### Phase 1 - Core Platform ✅ COMPLETED
- [x] Multi-language support (English, Turkish)
- [x] User authentication (Firebase Auth)
- [x] Responsive design (Mobile, Tablet, Desktop)
- [x] Module-based architecture
- [x] Base component library

### Phase 2 - Educational Modules ✅ COMPLETED
- [x] Academic Planning module with interactive templates
- [x] Study Skills module with step-by-step guides
- [x] Career Guidance module with accordion navigation
- [x] University Life module with resource directory
- [x] Personal Development with gamification
- [x] Financial Planning module with budget tracking

### Phase 3 - Interactive Features ✅ COMPLETED
- [x] 590+ translation keys (EN/TR)
- [x] Skill progress tracking system
- [x] Challenge and achievement system
- [x] Interactive priority matrix
- [x] Development path selection
- [x] Campus resource directory
- [x] Real-time progress visualization

### Phase 4 - Upcoming Features 🚧
- [ ] User progress persistence (save to database)
- [ ] Interactive quizzes and assessments
- [ ] Student community forums
- [ ] Study group matching system
- [ ] AI-powered personalized recommendations
- [ ] Achievement badges and leaderboards
- [ ] Export reports (PDF/Excel)
- [ ] Mobile native application (React Native)
- [ ] Dark mode theme toggle
- [ ] Notification system
- [ ] Calendar integration
- [ ] Study timer with Pomodoro technique

## 🔄 Project Status

EduPath is under active development with regular updates and new features being added. We welcome contributions from the community!
