<div align="center">

# ✨ Pictora  ✨

</div>
# 🛠️ Tech Stack

<div align="center">

 Frontend
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.15-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)


 Backend
![Node.js](https://img.shields.io/badge/Node.js-20.0.0-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18.0-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-47A248?style=flat-square&logo=mongodb&logoColor=white)

</div>
# ✨ Features

- 🚀 **Fast Processing**: Optimized for performance
- 📱 **Responsive Design**: Works on all devices
- 🔒 **Secure Processing**: Your images stay private
- 💡 **AI**: AI-powered Images



## 🚀 Quick Start

<div align="left">

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

</div>

### 1. Clone the Repository
```bash
git clone https://github.com/singh04ayush/imagify.git
cd imagify
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file in the server directory
touch .env

# Add the following environment variables to .env:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIPDROP_API=your_clipdrop_api_key

# Start the server
npm run server
```

#### Backend Environment Variables Explanation
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://username:password@cluster.mongodb.net/imagify` |
| `JWT_SECRET` | Secret key for JWT authentication | `your-secret-key-here` |
| `CLIPDROP_API` | API key for ClipDrop image generation | `your-clipdrop-api-key` |

### 3. Frontend Setup
```bash
# Open a new terminal
# Navigate to client directory
cd client

# Install dependencies
npm install

# If vite not installed
npm install vite@latest

# Create .env file in the client directory
touch .env

# Add the following environment variable to .env:
VITE_BACKEND_URL=http://localhost:5000

# Start the development server
npm run dev
```


### 4. Access the Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

<div align="center">

### Development Scripts

| Command | Description |
|---------|-------------|
| `npm run server` | Starts backend |
| `npm run dev` | Starts frontend |

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT secret key | - |

</div>




