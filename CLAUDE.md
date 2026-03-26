# 📘 PaperStockIndia — Frontend Context (Angular)

## 🧱 System Overview

PaperStockIndia is a full-stack stock paper trading platform.

Frontend Responsibilities:
- UI rendering
- User interaction
- API communication with backend
- State handling (lightweight)

---

## 📂 Repository

Frontend Repo:
https://github.com/kiranakella/paperStock

Active Branch:
frontEnd

---

## ⚙️ Frontend Tech Stack

- Framework: Angular (latest stable)
- Language: TypeScript
- Styling: CSS / SCSS
- Build Tool: Angular CLI
- Deployment: Netlify

---

## 📁 Project Structure
src/app
│
├── core # singleton services (auth, api)
├── shared # reusable components, pipes
├── features # feature modules (auth, dashboard, portfolio)
├── models # interfaces / types
├── services # API services
├── guards # route guards (future)
├── interceptors # HTTP interceptors (future)
└── app-routing.module.ts


---

## 🧠 Frontend Principles

- Component-based architecture
- Separation of concerns
- Reusable UI components
- API-driven UI
- Minimal business logic (backend handles logic)

---

## 🔗 API Integration

Backend Base URL:

Local:
http://localhost:8080/api

Production (to be updated after backend deploy):
TBD

---

## ⚙️ Environment Configuration

### environment.ts
apiUrl: 'http://localhost:8080/api

### environment.prod.ts

apiUrl: 'https://your-backend-url/api
'


---

## 📦 Core Features (Current / Planned)

### Auth Module
- Login page
- Register page (future)
- Token handling (future)

### Dashboard Module
- Portfolio summary
- Holdings view

### Portfolio Module
- Buy/Sell stocks
- Transaction history

---

## 🚀 Current Status

- ✅ Angular app created
- ✅ Routing configured
- ✅ Netlify deployment successful
- ⚠️ Backend not connected yet
- ⚠️ Authentication not implemented

---

## 🎯 Current Tasks

- Ensure routing works correctly
- Connect frontend to backend APIs
- Handle login flow UI

---

## 📌 Routing Strategy

- SPA routing handled via `_redirects`:

/* /index.html 200


- Routes:
  - /auth/login
  - /dashboard
  - /dashboard/portfolio

---

## 🛠 Build & Run

Run locally:

ng serve


Build production:

ng build --configuration production


---

## 🌐 Deployment (Netlify)

- Auto-deploy via GitHub
- Build command:

npm run build -- --configuration production


- Publish directory:

dist/paperStock


---

## ⚠️ Known Issues

- Backend API not connected → login may fail
- No error handling UI yet
- No auth guard implemented

---

## 🧩 Future Enhancements

- JWT authentication
- Route guards
- HTTP interceptors (auth token injection)
- Global error handling
- State management (NgRx optional)

---

## 💡 Developer Guidelines

- Keep components small and reusable
- Avoid heavy logic in components
- Use services for API calls
- Maintain clean folder structure
- Follow Angular best practices

---

## 🔥 Integration Plan

1. Deploy backend
2. Update environment.prod.ts
3. Enable CORS in backend
4. Test API calls
5. Implement login flow

---

## 🧠 Claude Usage Notes

- This file provides persistent frontend context
- Helps maintain consistency across sessions
- Update when new modules/features are added

---

## 🚀 Next Immediate Action

- Connect Angular to backend `/api/hello`
- Verify API integration
- Start implementing authentication flow