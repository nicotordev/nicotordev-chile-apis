import App from './app';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get port from environment or use default
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Create app instance
const app = new App();

// Start the server
app.listen(PORT);