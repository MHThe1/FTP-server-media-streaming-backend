const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS so your Electron app can fetch data
app.use(cors());

// Endpoint to get config
app.get('/api/config', (req, res) => {
    try {
        const configPath = path.join(__dirname, 'config.json');
        
        // Check if config exists
        if (!fs.existsSync(configPath)) {
            return res.status(404).json({ error: 'Config not found' });
        }

        // Read and parse config
        const configData = fs.readFileSync(configPath, 'utf8');
        const config = JSON.parse(configData);
        
        res.json(config);
    } catch (error) {
        console.error('Error reading config:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the Express API
module.exports = app;

// Only listen if running locally
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Config server running on http://localhost:${PORT}`);
    });
}
