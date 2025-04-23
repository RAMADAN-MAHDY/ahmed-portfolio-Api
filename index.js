import express from 'express'
import cors from 'cors'
import connectDB from './db.js';
import postProject from './Routers/POST/projectRouter.js'; // استيراد راوتر إضافة المشاريع
import getProjects from './Routers/GET/getProjects.js'; // استيراد راوتر جلب المشاريع
import updateProject from './Routers/PUT/updateProject.js';// استيراد راوتر تحديث المشاريع
import deleteProject from './Routers/DELETE/deleteProject.js'; // استيراد راوتر حذف المشاريع
import loginRouter from './Routers/loginAndCreatePass/login.js'; // استيراد راوتر تسجيل الدخول وإنشاء كلمة مرور
import getImageRouter from './Routers/GET/getImage.js'; // استيراد راوتر جلب الصورة
import addNewImage from './Routers/POST/addNewImage.js'; // استيراد راوتر إضافة صورة جديدة
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 5000;
//https://ahmed-mahdy.vercel.app/
var corsOptions = {
    origin: 'https://ahmed-mahdy.vercel.app/',
    optionsSuccessStatus: 200 , // some legacy browsers (IE11, various SmartTVs) choke on 204,
    credentials: true, // Enable set cookie
  }

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser()); // Middleware to parse cookies
connectDB();    // Connect to MongoDB



// Use the project router for all routes starting with /api

app.use('/api/add-project', postProject); // إضافة مشروع جديد
app.use('/api/get-projects', getProjects); // جلب المشاريع
app.use('/api/updateProject' , updateProject );         // تحديث مشروع
app.use('/api/deleteProject' , deleteProject );// حذف مشروع
app.use('/api/admin', loginRouter); // تسجيل الدخول وإنشاء كلمة مرور
app.use('/api/addNewImage', addNewImage); // إضافة صورة جديدة
app.use('/api/getImage', getImageRouter);       // جلب الصورة






app.get('/',(req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})