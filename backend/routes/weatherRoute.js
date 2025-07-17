const express = require('express');
const router = express.Router();
const Weather = require('../models/Weather');

router.get('/:param', async (req, res) => {
  const { param } = req.params;
  const allowed = ['temperature', 'humidity', 'pressure'];
  if (!allowed.includes(param)) {
    return res.status(400).json({ error: 'Invalid parameter' });
  }

  try {
    const data = await Weather.find({}, { timestamp: 1, [param]: 1 })
      .sort({ timestamp: -1 })
      .limit(1000);
    const formatted = data.reverse().map(item => ({
      timestamp: item.timestamp,
      value: item[param]
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
