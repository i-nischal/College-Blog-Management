AI Blog Application

A simple AI-powered blogging platform built using the MERN Stack, integrated with Google Gemini API for AI content generation and ImageKit for efficient image handling. Users can securely create, manage, and publish blog posts with ease.

✨ Features

AI-generated blog content using Google Gemini API

Image upload and optimization with ImageKit

Full CRUD functionality (Create, Read, Update, Delete)

Secure JWT-based authentication

Fully responsive React UI

🧰 Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

AI Integration: Google Gemini API

Image Management: ImageKit

Authentication: JWT

📁 Project Structure
ai-blog-app
├── client
├── server
├── .env
├── package.json
└── README.md

⚙️ Setup & Run
1️⃣ Clone the Repository
git clone https://github.com/i-nischal/Keyboard-Development.git

2️⃣ Install Dependencies
cd client && npm install
cd ../server && npm install

3️⃣ Configure Environment Variables

Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongo_uri
GEMINI_API_KEY=your_api_key
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url
JWT_SECRET=your_secret

4️⃣ Run the Project
npm run dev

📜 License

MIT License
