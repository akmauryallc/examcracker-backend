const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order
router.post("/create-order", async (req, res) => {
    try {
        const options = {
            amount: 19900, // ₹199
            currency: "INR",
            receipt: "order_rcptid_" + Date.now()
        };

        const order = await razorpay.orders.create(options);
        res.json(order);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Verify payment
router.post("/verify-payment", (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            return res.json({ success: true });
        } else {
            return res.status(400).json({ success: false });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
