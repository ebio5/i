const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());
app.get('/bypass', async (req, res) => {
    const url = req.query.url;
    try {
        const response = await axios.get(`https://api.bypass.vip/bypass?url=${encodeURIComponent(url)}`);
        res.json(response.data);
    } catch (e) { res.json({ error: "API Down" }); }
});
app.listen(process.env.PORT || 3000);
