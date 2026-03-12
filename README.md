# AI-Powered Blog App

An advanced full-stack **AI-powered blogging platform** built with **MERN Stack**, integrated with **Google Gemini API** for AI-generated content, and **ImageKit API** for optimized image storage and delivery. Users can create, read, update, and delete blog posts with ease.

---

## 🚀 Features
- AI-powered content generation using Google Gemini API
- Image upload and optimization via ImageKit API
- Full CRUD functionality for blog posts
- JWT-based authentication (Sign Up / Login)
- Responsive design with React
- MongoDB database for storage
- REST API with Express.js

---

## 🛠 Tech Stack
- **Frontend**: React.js, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Google Gemini API
- **Image Management**: ImageKit API
- **Authentication**: JSON Web Token (JWT)
- **Environment Variables**: dotenv

---

## 📂 Project Structure
ai-blog-app
├── client
│ ├── public
│ └── src
│ ├── components
│ ├── pages
│ └── App.jsx
├── server
│ ├── models
│ ├── routes
│ ├── controllers
│ └── server.js
├── .env
├── README.md
└── package.json


---

## ⚙️ Installation & Setup

### **Prerequisites**
- Node.js (v14+)
- MongoDB (Local or MongoDB Atlas)
- Google Gemini API Key
- ImageKit account (for API keys)

---

### **Steps to Run Locally**
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-blog-app.git
   cd ai-blog-app

2. Install dependencies
For client:
cd client
npm install
For server:
cd ../server
npm install

3. Set up environment variables
Create a `.env` file in the `server` directory with the following variables:
PORT=5000
MONGO_URI=your_mongo_db_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_secret_key

📄 License
This project is licensed under the MIT License.


---
