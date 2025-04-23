import express from 'express';
import multer from 'multer'; 
import axios from 'axios'; 
import adminImages from '../../MongooseSchema/adminImageSchema.js'; // إنشاء سكيما جديدة لتخزين بيانات الأدمن
import dotenv from 'dotenv';
import qs from 'qs';




dotenv.config();

const postImage = express.Router();

// Multer setup for handling file uploads
const storage = multer.memoryStorage(); // بنخزن الصورة في الذاكرة مؤقتًا
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // حجم الصورة محدود بـ 5MB
  fileFilter: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    if (ext === 'jpeg' || ext === 'png' || ext === 'jpg') {
      cb(null, true);  // صورة مسموحة
    } else {
      cb(new Error('Only jpg, jpeg, and png are allowed'), false);  // صورة غير مسموحة
    }
  }
});

// API key for ImgBB
const IMGBB_API_KEY = process.env.IMGBB_API_KEY; // مفتاح الـ API من البيئة

// Route to handle project creation
postImage.post('/', upload.single('image'), async (req, res) => {
    try {
        let imageUrl = '';

        // Handle image upload if file exists
        if (req.file) {
          const imageBase64 = req.file.buffer.toString('base64');
          try {
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}&expiration=0`,
                qs.stringify({ image: imageBase64 }), // لازم تستخدم qs.stringify
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                }
              );
              
            if (response.data && response.data.data && response.data.data.url) {
              imageUrl = response.data.data.url;
            } else {
              console.error('ImgBB upload did not return a valid URL', response.data);
              return res.status(502).json({ message: 'Image upload failed', error: 'Invalid response from ImgBB' });
            }
          } catch (uploadError) {
            console.log('ImgBB Error Response:', uploadError.response?.data || uploadError.message);
            return res.status(502).json({ message: 'Image upload failed', error: uploadError.message });
          }
        }
    
        // Create and save project
        // const newimage = await adminImages.create({
        //     image: imageUrl
        // });
    
     // تحديث مستند الصور أو إنشاؤه إذا لم يكن موجودًا
     const newimage = await adminImages.findOne();
     if (newimage) {
        newimage.images.push({ url: imageUrl });
       await newimage.save();
     } else {
       await adminImages.create({ images: [{ url: imageUrl }] });
     }


        return res.status(201).json({ message: 'newProject created successfully', newimage: newimage });
      } catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({ message: 'Error creating project', error: error.message });
      }
});

export default postImage;
