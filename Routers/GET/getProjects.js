import express from 'express';
import Project from '../../MongooseSchema/projectSchema.js'; // استيراد الموديل

const getProjects = express.Router();

getProjects.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt : -1 }); // ترتيب تنازلي حسب التاريخ
    console.log('Fetched projects:', projects); // تسجيل المشاريع المسترجعة
    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

export default getProjects;
