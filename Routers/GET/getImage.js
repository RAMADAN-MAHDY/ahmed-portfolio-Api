import express from 'express';
import adminImages from '../../MongooseSchema/adminImageSchema.js'; // استيراد السكيما الخاصة بالمشاريع

const getImageRouter = express.Router();

// Route to get the latest image
getImageRouter.get('/', async (req, res) => {
  try {
    // Find the latest project and get its image
    const latestProject = await adminImages.findOne(); // ترتيب حسب تاريخ الإنشاء

    if (!latestProject || latestProject.images.length < 0) { // تحقق من وجود مشروع
        console.log("latestProject not found");

      return res.status(404).json({ message: 'No image found' });
    }

    const latestImage = latestProject.images[latestProject.images.length - 1]; // الحصول على أحدث صورة
    if (!latestImage) {
      console.log("latestImage not found");

      return res.status(404).json({ message: 'No image found' });
    }
   console.log(latestProject);
   console.log("latestProject");
    res.status(200).json({ image: latestImage.url , date: latestImage.uploadedAt});// إرسال الصورة
  } catch (error) {
    console.error('Error fetching the latest image:', error);
    res.status(500).json({ message: 'Error fetching the latest image', error: error.message });
  }
});

export default getImageRouter;