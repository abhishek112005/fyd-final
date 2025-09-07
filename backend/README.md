# Find Your Doctor - Backend API

A complete Node.js backend for the "Find Your Doctor" MERN application with Clerk authentication integration.

## 🚀 Features

- **User Management**: Profile management with Clerk authentication
- **Doctor Profiles**: Complete CRUD operations for doctor profiles
- **Appointment System**: Book, cancel, and manage appointments
- **Search & Filter**: Advanced doctor search by specialization, fees, hospital, and rating
- **Reviews & Ratings**: Doctor review system with rating calculations
- **Authentication**: Secure API endpoints with Clerk middleware

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/          # Route handlers
│   │   ├── userController.js
│   │   ├── doctorController.js
│   │   └── appointmentController.js
│   ├── db/
│   │   └── db.js            # MongoDB connection
│   ├── middlewares/
│   │   └── auth.js          # Clerk authentication middleware
│   ├── modles/              # Mongoose schemas
│   │   ├── user.js
│   │   ├── doctor.js
│   │   └── appointment.js
│   ├── routes/              # API routes
│   │   ├── userRoutes.js
│   │   ├── doctorRoutes.js
│   │   └── appointmentRoutes.js
│   └── index.js             # Server entry point
├── package.json
└── .env.example             # Environment variables template
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your actual values:
   ```env
   MONGO_URI=mongodb://localhost:27017/find-your-doctor
   CLERK_API_KEY=your_clerk_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system

5. **Run the server**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Create/update user (Clerk webhook) | No |
| GET | `/profile` | Get user profile | Yes |
| PUT | `/profile` | Update user profile | Yes |

### Doctor Routes (`/api/doctors`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all doctors | No |
| GET | `/search` | Search doctors by filters | No |
| GET | `/:id` | Get doctor by ID | No |
| POST | `/` | Create doctor profile | Yes |
| PUT | `/` | Update doctor profile | Yes |
| POST | `/:doctorId/reviews` | Add review to doctor | Yes |

### Appointment Routes (`/api/appointments`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/book` | Book new appointment | Yes |
| GET | `/my-appointments` | Get user's appointments | Yes |
| PUT | `/:appointmentId/cancel` | Cancel appointment | Yes |
| GET | `/doctor-appointments` | Get doctor's appointments | Yes |
| PUT | `/:appointmentId/status` | Update appointment status | Yes |

## 🔍 Search Parameters

### Doctor Search (`/api/doctors/search`)

Query parameters:
- `specialization` - Filter by medical specialization
- `minFees` - Minimum consultation fees
- `maxFees` - Maximum consultation fees
- `hospital` - Filter by hospital name
- `minRating` - Minimum rating (1-5)

Example:
```
GET /api/doctors/search?specialization=cardiology&minRating=4&maxFees=1000
```

## 📝 Data Models

### User Schema
```javascript
{
  clerkId: String (unique, required),
  name: String (required),
  email: String (unique, required),
  role: String (enum: ['patient', 'doctor'], default: 'patient'),
  createdAt: Date
}
```

### Doctor Schema
```javascript
{
  userId: ObjectId (ref: User, required),
  specialization: String (required),
  experience: Number (required, min: 0),
  fees: Number (required, min: 0),
  hospital: String (required),
  rating: Number (default: 0, min: 0, max: 5),
  reviews: [{
    userId: ObjectId (ref: User),
    rating: Number (min: 1, max: 5),
    comment: String,
    createdAt: Date
  }],
  availability: {
    monday: { start: String, end: String, available: Boolean },
    tuesday: { start: String, end: String, available: Boolean },
    // ... other days
  }
}
```

### Appointment Schema
```javascript
{
  userId: ObjectId (ref: User, required),
  doctorId: ObjectId (ref: Doctor, required),
  date: Date (required),
  status: String (enum: ['booked', 'cancelled', 'completed'], default: 'booked'),
  notes: String
}
```

## 🔐 Authentication

The API uses Clerk for authentication. Include the Clerk session token in the Authorization header:

```javascript
headers: {
  'Authorization': 'Bearer <clerk-session-token>',
  'Content-Type': 'application/json'
}
```

## 🚨 Error Handling

The API returns standardized error responses:

```javascript
{
  "message": "Error description",
  "status": 400
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## 🧪 Testing

Test the API endpoints using tools like Postman or curl:

```bash
# Test base route
curl http://localhost:5000/

# Test doctor search
curl "http://localhost:5000/api/doctors/search?specialization=cardiology"
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **morgan** - HTTP request logger
- **dotenv** - Environment variable loader
- **@clerk/clerk-sdk-node** - Clerk authentication

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please contact the development team.


