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
- **React 18** 
- **TypeScript 5** 
- **Material UI v5** 
- **Emotion** 
- **React Router v6**
- **React i18next** 
- **Vite** 
- **Framer Motion**
- **React Hook Form**

### Backend
- **Firebase** - (BaaS)
  - **Firestore** 
  - **Firebase Auth** 
  - **Firebase Storage** 
  - **Firebase Hosting** 
  - **Security Rules** 
- **Node.js** 
- **TypeScript**

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

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **GitLab**: [EduPath Repository](https://gitlab.com/Abdhalid/edupath-app)
- **Developer**: Abdhalid
- **Issues**: [Report bugs or request features](https://gitlab.com/Abdhalid/edupath-app/-/issues)

## 🔄 Project Status

EduPath is under active development with regular updates and new features being added. We welcome contributions from the community!
