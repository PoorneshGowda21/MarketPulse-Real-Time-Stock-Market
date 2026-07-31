import * as dotenv from 'dotenv';
dotenv.config();
import app from './api/app.js';

// Initialise the port
const port = process.env.PORT || 8080;

// Listen to the port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});