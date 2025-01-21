const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const serviceAccount = require('../servicekey/japanese-word-battle-firebase-adminsdk-rtw12-b70429bb9f.json');
router.post('/:userId/Stamp_Data/:stampStage', async (req, res) => {
    const userId = req.params.userId;
    const updateStamp_Data = req.params.stampStage;
    const dataToUpdate = req.body;
  
    try {
      const db = admin.database();
      const ref = db.ref(`User_Data/${userId}/Stamp_Data/${updateStamp_Data}`);
      await ref.update(dataToUpdate);
      res.json({ message: 'Data updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update data' });
    }
  });

module.exports = router;