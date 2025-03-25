import dotenv from 'dotenv';

import App from './app';

// Load environment variables
dotenv.config({ path: '.env' });

// Get port from environment or use default
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Create app instance
const app = new App();

// Start the server
app.listen(PORT);
