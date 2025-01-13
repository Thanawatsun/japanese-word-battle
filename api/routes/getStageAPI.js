const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const serviceAccount = require('../servicekey/japanese-word-battle-firebase-adminsdk-rtw12-b70429bb9f.json');
const session = require('express-session');

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
router.get('/', async (req, res) => {
    try {
        const db = admin.database();
        const snapshot = await db.ref('Game_Level').once('value');
        const data = snapshot.val();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

module.exports = router;

