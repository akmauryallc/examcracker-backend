const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// Verify Firebase ID Token
router.post("/verify-user", async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ error: "Token missing" });
        }

        const decodedToken = await admin.auth().verifyIdToken(token);

        return res.json({
            success: true,
            uid: decodedToken.uid,
            phone: decodedToken.phone_number
        });

    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Invalid token" });
    }
});

module.exports = router;
