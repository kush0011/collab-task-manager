# Setup Guide

## Prerequisites
- Node.js 16+
- Firebase Project
- Git

## Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - Enable Firestore Database
   - Enable Storage
   - Enable Authentication (Email/Password, Google)

2. **Generate Firebase Service Account Key**
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   ```
   - Add Firebase config from your Firebase Console (Web config)

4. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```
   - Add Firebase credentials from the service account JSON
   - Set JWT_SECRET to a random string
   - Set CORS_ORIGIN to your frontend URL

## Running Locally

### Terminal 1: Backend
```bash
cd backend
npm run dev
```
Server will start on `http://localhost:5000`

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```
App will start on `http://localhost:3000`

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Set environment variables
4. Deploy

### Backend (Railway/Render)
1. Create account on Railway or Render
2. Connect GitHub repo
3. Set environment variables
4. Deploy

### Database & Storage
Firebase is fully managed - no additional setup needed for production.
