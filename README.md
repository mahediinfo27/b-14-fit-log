# 💪 FitLog — Workout Library

FitLog is a responsive workout library web application built with Next.js and Tailwind CSS. It allows users to explore workouts, view detailed exercise information, create a daily workout plan, save workouts for later, and track completed exercises.

## 🚀 Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Workout API
- Browser Local Storage

## ✨ Features

1. **Workout Library** — Browse workouts fetched from an API.
2. **Workout Details** — View exercise descriptions, equipment, difficulty, sets, reps, duration, calories, ratings, and instructions.
3. **Today's Plan** — Add workouts to a daily plan with a maximum of five exercises.
4. **Saved Workouts** — Save workouts and revisit them later.
5. **Workout Tracking** — Mark planned workouts as completed or remove them from your plan.
6. **Search Workouts** — Find workouts by name, equipment, or muscle group.
7. **Workout Sorting** — Sort workouts by duration, calories burned, and rating.
8. **Responsive Design** — Enjoy a responsive experience on mobile, tablet, and desktop screens.
9. **Loading and Error Handling** — Display feedback while workout data loads or if a request fails.

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/mahediinfo27/b-14-fit-log.git
cd b-14-fit-log
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 API

FitLog uses the following API to retrieve workout information.

### Get All Workouts

```text
https://api.api-store.workers.dev/api/fitlog
```

### Get a Single Workout

Replace `:id` with the workout's ID.

```text
https://api.api-store.workers.dev/api/fitlog/:id
```

## 📦 Production Build

To create and verify the production build, run:

```bash
npm run build
```

## 🌐 Live Demo

[Visit FitLog — Live Website](https://b-14-fit-log-27jk.vercel.app/)

## 📂 GitHub Repository

[View the FitLog Source Code](https://github.com/mahediinfo27/b-14-fit-log)

## 👨‍💻 Project Information

- **Project Name:** FitLog — Workout Library
- **Assignment:** B14-A6 FitLog
- **Framework:** Next.js
- **Deployment Platform:** Vercel

