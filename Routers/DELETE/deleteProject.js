import express from 'express';
import Project from '../../MongooseSchema/projectSchema.js';

const deleteProject = express.Router();

deleteProject.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'المشروع مش موجود' });
    }

    res.status(200).json({ message: '✅ تم حذف المشروع بنجاح' });
  } catch (error) {
    console.error('❌ خطأ في حذف المشروع:', error);
    res.status(500).json({ message: '❌ حصل خطأ في الحذف', error: error.message });
  }
});

export default deleteProject;
