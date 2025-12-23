const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/bypass', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.json({ error: "No URL provided" });

    // 予備を含めた複数のAPIを順番に試す
    const apis = [
        `https://ethone.cc/api/bypass?url=${encodeURIComponent(url)}`,
        `https://api.kazemaru.top/api/bypass?url=${encodeURIComponent(url)}`,
        `https://api.bypass.vip/bypass?url=${encodeURIComponent(url)}`
    ];

    for (const api of apis) {
        try {
            const response = await axios.get(api, { timeout: 5000 });
            const result = response.data.result || response.data.destination || response.data.url;
            if (result && result !== "error") {
                return res.json({ destination: result });
            }
        } catch (e) {
            console.log("One API failed, trying next...");
        }
    }
    res.json({ error: "All source APIs are down. Please try again later." });
});

app.listen(process.env.PORT || 3000);
