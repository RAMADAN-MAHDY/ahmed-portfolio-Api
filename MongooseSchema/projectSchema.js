import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  image: {
    type: String, // ده مسار الصورة في السيرفر (uploads/xxxxx.png)
    required: false
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;
