import express from 'express';
import multer from 'multer';
import axios from 'axios';
import qs from 'qs';
import Project from '../../MongooseSchema/projectSchema.js';

const updateProject = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // صورة لو جات

updateProject.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body }; // نبدأ بالبيانات اللي جت من الفورم

    // لو فيه صورة، نرفعها ونضيفها للـ updateData
    if (req.file) {
      const imageBase64 = req.file.buffer.toString('base64');

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        qs.stringify({ image: imageBase64 }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      if (response.data?.data?.url) {
        updateData.image = response.data.data.url;
      } else {
        return res.status(502).json({ message: 'Image upload failed' });
      }
    }

    // نحدث الحقول اللي اتبعتت فقط
    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

export default updateProject;
