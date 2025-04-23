import mongoose from 'mongoose';

const adminImageSchema = new mongoose.Schema({
      images: [
        {
          url: { type: String, required: true }, // رابط الصورة
          uploadedAt: { type: Date, default: Date.now }, // تاريخ رفع الصورة
        },
      ],
});

const adminImages = mongoose.model('adminImages', adminImageSchema);

export default adminImages;