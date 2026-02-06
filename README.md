# Me-API Playground

A basic playground that stores candidate information in a MongoDB database and exposes it via an Express API with a Next.js frontend.

## Architecture

- **Backend**: Express.js, MongoDB (Mongoose), CORS enabled.
- **Frontend**: Next.js 14+ (App Router), Vanilla CSS (Glassmorphism & Dark Mode).
- **Communication**: RESTful API calls from frontend to backend.

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB (Running locally or a connection string)

### Backend Setup

1. `cd backend`
2. `npm install`
3. Create a `.env` file (see `.env.example` or use the one provided during generation):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/me-api-playground
   ```
4. Seed the database: `node seed.js`
5. Start the server: `npm start` (or `npx nodemon index.js`)

### Frontend Setup

1. `cd frontend`
2. `npm install`
3. Start the dev server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `GET /health`: Liveness check.
- `GET /api/profile`: Get candidate profile.
- `GET /api/projects?skill=...`: Filter projects by skill.
- `GET /api/search?q=...`: Search projects and skills.

## Sample CURLs

```bash
# Health Check
curl http://localhost:5000/health

# Get Profile
curl http://localhost:5000/api/profile

# Search
curl http://localhost:5000/api/search?q=React
```

## Known Limitations

- The "Update Profile" endpoint is available but not integrated into the frontend UI (minimal focus on write ops as per requirements).
- Search is currently case-insensitive array filtering in JS; for larger datasets, MongoDB `$text` search would be better.

## Resume Link

[My Resume Link](https://drive.google.com/file/d/1HDQtuCksMgWpXa1lwpS1BB-UhCQ4wXuY/view?usp=sharing) <!-- Update with real link -->
