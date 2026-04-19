const express = require("express");
const router = express.Router();

// Demo video list (baad me DB se la sakte ho)
const videos = [
    {
        title: "Video 1",
        url: "https://www.youtube.com/embed/mNbq3K1ZJYg"
    },
    {
        title: "Video 2",
        url: "https://www.youtube.com/embed/mNbq3K1ZJYg"
    }
];

router.get("/videos", (req, res) => {
    res.json(videos);
});

module.exports = router;
