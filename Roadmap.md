# DoctorHub - Complete Build Plan

## Project Architecture

```
doctor-appointment/
├── frontend/                 # React.js frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Context API for state management
│   │   ├── services/        # API service functions
│   │   ├── utils/           # Utility functions
│   │   ├── hooks/           # Custom React hooks
│   │   └── App.js
│   ├── package.json
│   └── tailwind.config.js
│
└── backend/                  # Node.js + Express.js backend
    ├── models/              # MongoDB Mongoose models
    ├── routes/              # API route handlers
    ├── controllers/         # Business logic
    ├── middleware/          # Custom middleware (auth, validation)
    ├── config/              # Configuration files
    ├── utils/               # Utility functions
    ├── server.js            # Entry point
    └── package.json
```

## Technology Stack Decisions

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API
- **Calendar**: FullCalendar for React
- **HTTP Client**: Axios
- **Form Validation**: React Hook Form + Yup

## Phase 1: Project Setup & Configuration

### 1.1 Initialize Frontend

```bash
cd frontend
npx create-react-app . --template minimal
npm install tailwindcss postcss autoprefixer
npm install axios react-router-dom
npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid
npm install react-hook-form yup @hookform/resolvers
npm install jwt-decode
npx tailwindcss init -p
```

**Key Files to Create:**

- `frontend/tailwind.config.js` - Tailwind configuration
- `frontend/postcss.config.js` - PostCSS configuration
- `frontend/src/index.css` - Tailwind directives

### 1.2 Initialize Backend

```bash
cd backend
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install express-validator
npm install nodemailer
npm install --save-dev nodemon
```

**Key Files to Create:**

- `backend/.env` - Environment variables
- `backend/server.js` - Express server setup
- `backend/config/db.js` - MongoDB connection
- `backend/package.json` - Add start/dev scripts

## Phase 2: Database Schema Design

### 2.1 User Model (`backend/models/User.js`)

- `_id`
- `name`
- `email`
- `password` (hashed)
- `role` (patient/doctor)
- `phone`
- `createdAt`

### 2.2 Doctor Model (`backend/models/Doctor.js`)

- `_id`
- `userId` (ref: User)
- `specialization`
- `experience`
- `qualifications`
- `bio`
- `rating`
- `consultationFee`
- `profileImage`

### 2.3 Appointment Model (`backend/models/Appointment.js`)

- `_id`
- `patientId` (ref: User)
- `doctorId` (ref: Doctor)
- `date`
- `time`
- `status` (pending/confirmed/cancelled/completed)
- `notes`
- `prescription`
- `createdAt`

### 2.4 Availability Model (`backend/models/Availability.js`)

- `_id`
- `doctorId` (ref: Doctor)
- `dayOfWeek` (0-6)
- `startTime`
- `endTime`
- `isAvailable`

## Phase 3: Backend API Development

### 3.1 Authentication Routes (`backend/routes/auth.js`)

**Endpoints:**

- `POST /api/auth/register` - Register (patient/doctor)
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (protected)

**Files:**

- `backend/controllers/authController.js` - Auth logic
- `backend/middleware/auth.js` - JWT verification middleware

### 3.2 Doctor Routes (`backend/routes/doctors.js`)

**Endpoints:**

- `GET /api/doctors` - Get all doctors (with filters: specialization, location)
- `GET /api/doctors/:id` - Get doctor details
- `PUT /api/doctors/:id` - Update doctor profile (doctor only)
- `GET /api/doctors/:id/availability` - Get doctor availability

**Files:**

- `backend/controllers/doctorController.js`

### 3.3 Appointment Routes (`backend/routes/appointments.js`)

**Endpoints:**

- `POST /api/appointments` - Book appointment (patient)
- `GET /api/appointments` - Get appointments (filtered by user role)
- `PUT /api/appointments/:id` - Update appointment status (doctor)
- `DELETE /api/appointments/:id` - Cancel appointment
- `PUT /api/appointments/:id/prescription` - Add prescription (doctor)

**Files:**

- `backend/controllers/appointmentController.js`

### 3.4 Availability Routes (`backend/routes/availability.js`)

**Endpoints:**

- `POST /api/availability` - Set availability (doctor)
- `GET /api/availability/:doctorId` - Get availability
- `PUT /api/availability/:id` - Update availability (doctor)
- `DELETE /api/availability/:id` - Remove availability slot

**Files:**

- `backend/controllers/availabilityController.js`

## Phase 4: Frontend Component Structure

### 4.1 Context Setup (`frontend/src/context/`)

- `AuthContext.js` - Authentication state
- `AppointmentContext.js` - Appointment state (optional)

### 4.2 Services (`frontend/src/services/`)

- `api.js` - Axios instance with interceptors
- `authService.js` - Auth API calls
- `doctorService.js` - Doctor API calls
- `appointmentService.js` - Appointment API calls

### 4.3 Components (`frontend/src/components/`)

**Layout:**

- `Navbar.js` - Navigation bar
- `Footer.js` - Footer
- `Layout.js` - Main layout wrapper

**Auth:**

- `Login.js` - Login form
- `Register.js` - Registration form (with role selection)

**Doctor:**

- `DoctorCard.js` - Doctor card for listing
- `DoctorProfile.js` - Doctor detail view
- `DoctorList.js` - List of doctors with filters

**Appointment:**

- `AppointmentForm.js` - Booking form
- `AppointmentCard.js` - Appointment display card
- `AppointmentCalendar.js` - Calendar view (FullCalendar)

**Common:**

- `Loading.js` - Loading spinner
- `Error.js` - Error message display
- `ProtectedRoute.js` - Route protection wrapper

### 4.4 Pages (`frontend/src/pages/`)

- `Home.js` - Landing page
- `Doctors.js` - Doctor listing page
- `DoctorDetail.js` - Single doctor page
- `BookAppointment.js` - Appointment booking page
- `MyAppointments.js` - User's appointments
- `Dashboard.js` - Doctor dashboard
- `Profile.js` - User profile page

## Phase 5: Implementation Order

### Step 1: Backend Foundation

1. Set up Express server with MongoDB connection
2. Create all Mongoose models
3. Implement authentication (register/login) with JWT
4. Test with Postman/Thunder Client

### Step 2: Backend API

1. Implement doctor routes (CRUD)
2. Implement availability routes
3. Implement appointment routes
4. Add email notification service (nodemailer)

### Step 3: Frontend Foundation

1. Set up React Router
2. Create Context API for auth
3. Set up Axios with interceptors
4. Create protected route wrapper
5. Build Navbar with auth state

### Step 4: Authentication UI

1. Create Login page
2. Create Register page
3. Implement login/logout functionality
4. Add token storage (localStorage)

### Step 5: Doctor Features

1. Create doctor listing page with filters
2. Create doctor card component
3. Create doctor detail page
4. Implement search and filter functionality

### Step 6: Appointment Features

1. Create appointment booking form
2. Integrate FullCalendar for date/time selection
3. Create appointment confirmation page
4. Build "My Appointments" page for patients

### Step 7: Doctor Dashboard

1. Create doctor dashboard layout
2. Build appointment management (view/accept/reschedule)
3. Add availability management interface
4. Create prescription form

### Step 8: Styling & Polish

1. Apply Tailwind CSS throughout
2. Add responsive design
3. Implement loading states
4. Add error handling and user feedback
5. Add form validation

## Phase 6: Key Implementation Details

### Authentication Flow

```
User Registration → Hash Password → Save to DB → Return JWT
User Login → Verify Password → Generate JWT → Store in localStorage
Protected Routes → Check JWT → Verify Token → Allow Access
```

### Appointment Booking Flow

```
Patient selects doctor → View availability → Select date/time → 
Check slot availability → Create appointment → Send confirmation email
```

### Doctor Availability Management

```
Doctor sets weekly schedule → System generates available slots → 
When appointment booked → Slot marked unavailable → 
Doctor can override/manually block slots
```

## Phase 7: Environment Variables

### Backend `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doctorhub
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Frontend `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Phase 8: Testing & Deployment Checklist

- [ ] Test all API endpoints
- [ ] Test authentication flow
- [ ] Test appointment booking
- [ ] Test doctor dashboard
- [ ] Responsive design on mobile
- [ ] Error handling
- [ ] Form validation
- [ ] Email notifications
- [ ] Security (password hashing, JWT expiration)
- [ ] CORS configuration
- [ ] Environment variables setup

## Additional Features (Optional Enhancements)

1. **Email Notifications**: Use nodemailer for booking confirmations
2. **Rating System**: Allow patients to rate doctors after appointments
3. **Prescription Management**: Doctors can add/view prescriptions
4. **Chat/Messaging**: Real-time communication (Socket.io)
5. **Payment Integration**: Stripe/PayPal for consultation fees
6. **Admin Panel**: Super admin to manage all users
7. **Search & Filters**: Advanced filtering by specialization, location, rating
8. **Appointment Reminders**: Email/SMS reminders before appointment

## File Structure Summary

### Backend:

- `server.js` - Express app entry
- `config/db.js` - MongoDB connection
- `models/` - User, Doctor, Appointment, Availability
- `routes/` - auth, doctors, appointments, availability
- `controllers/` - Business logic for each route
- `middleware/auth.js` - JWT verification
- `utils/` - Helpers, email service

### Frontend:

- `src/App.js` - Main app component with routes
- `src/index.js` - Entry point
- `src/context/AuthContext.js` - Auth state
- `src/services/` - API service functions
- `src/components/` - Reusable components
- `src/pages/` - Page components
