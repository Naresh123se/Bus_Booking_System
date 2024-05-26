# MERN Authentication Starter

This is a starter app for a MERN stack application with authentication. This is for a SPA (Single Page Application) workflow that uses the [Vite](https://vite.dev) Build tool. Th
<img src="./frontend/public/3.svg" />

It includes the following:

- Backend API with Express & MongoDB
- Routes for auth, logout, register, profile, update profile
- JWT authentication stored in HTTP-only cookie
- Protected routes and endpoints
- Custom middleware to check JSON web token and store in cookie
- Custom error middleware
- React frontend to register, login, logout, view profile, and update profile
- React Bootstrap UI library
- React Toastify notifications

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
<<<<<<< HEAD

=======
<<<<<<< HEAD
=======

>>>>>>> main
>>>>>>> work

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV=development
PORT=5000
MONGO_URI= your mongo url
GOOGLE_MAPS_API_KEY= your google map url
GOOGLE_CLIENT_ID= your google client url
GOOGLE_CLIENT_SECRET= your google secret url
EMAIL_USERNAME= your email  url
EMAIL_PASSWORD= your email password  url
KHALTI_KEY= your khalTI key
ReCAPTCHA=  your reCAPTCHA
STRIPE_SECRET_KEY=   your STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY= your STRIPE_PUBLISHABLE_KEY
```

Change the all this to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
