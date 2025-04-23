import express from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../../MongooseSchema/adminSchema.js'; // إنشاء سكيما جديدة لتخزين بيانات الأدمن

const loginRouter = express.Router();

// تسجيل كلمة مرور جديدة (يدوي)
loginRouter.post('/create-password', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'كلمة المرور مطلوبة' });
    }

    // تشفير كلمة المرور
    const salt = await bcrypt.genSalt(10); // إنشاء Salt
    const hashedPassword = await bcrypt.hash(password, salt); // تشفير كلمة المرور

    // تخزين كلمة المرور في قاعدة البيانات
    const newAdmin = new Admin({ password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'تم إنشاء كلمة المرور بنجاح' });
  } catch (error) {
    console.error('Error creating password:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء كلمة المرور', error: error.message });
  }
});

// تسجيل الدخول
loginRouter.post('/login', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'كلمة المرور مطلوبة' });
    }

    // جلب كلمة المرور المشفرة من قاعدة البيانات
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ message: 'لم يتم العثور على كلمة مرور' });
    }

    // مقارنة كلمة المرور المدخلة مع المشفرة
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'كلمة المرور غير صحيحة' });
    }
   // إنشاء الكوكيز
   res.cookie('adminSession', 'authenticated', {
    httpOnly: true, // الكوكيز لا يمكن الوصول إليها من JavaScript
    secure: true, // اجعلها true إذا كنت تستخدم HTTPS
    maxAge: 24 * 60 * 60 * 1000, // مدة الجلسة (24 ساعة)
  });


    res.status(200).json({ message: 'تم تسجيل الدخول بنجاح' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول', error: error.message });
  }
});

loginRouter.get('/check-session', (req, res) => {
    const session = req.cookies.adminSession;
    if (session === 'authenticated') {
      res.status(200).json({ message: 'الجلسة صالحة' });
    } else {
      res.status(401).json({ message: 'الجلسة غير صالحة' });
    }
  });

export default loginRouter;