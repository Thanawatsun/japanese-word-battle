const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const serviceAccount = require('../servicekey/japanese-word-battle-firebase-adminsdk-rtw12-b70429bb9f.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyBKZ9qbKo4YRtjMwvK4LcCF54-m_ZMavSc",
    authDomain: "japanese-word-battle.firebaseapp.com",
    databaseURL:
      "https://japanese-word-battle-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "japanese-word-battle",
    storageBucket: "japanese-word-battle.appspot.com",
    messagingSenderId: "936660245889",
    appId: "1:936660245889:web:968a958904de9332609c80",
    measurementId: "G-DYTEZJ7XTH",
});
router.post('/', async (req, res) => {
    try {
        const db = admin.database();
        const ref = db.ref('Game_Level');
        const dataToUpdate = req.body;

        // ตรวจสอบข้อมูลที่ได้รับ (เพิ่มขั้นตอนนี้เพื่อความปลอดภัย)
        if (!dataToUpdate || Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({ error: 'Missing data to update' });
        }

        // อัปเดตข้อมูลใน Firebase Realtime Database
        await ref.update(dataToUpdate);

        res.json({ message: 'Data updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update data' });
    }
});

module.exports = router;