import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    platform: 'Acadiv API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Startup & MongoDB Connection
async function startServer() {
  try {
    // Attempt database connection if URI is set
    if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('<username>')) {
      await connectDB();
    } else {
      console.log('\n⚠️ [Acadiv Backend]: MONGODB_URI is pending configuration in backend/.env.');
      console.log('👉 Team member can paste real MongoDB Atlas connection string anytime!\n');
    }

    app.listen(PORT, () => {
      console.log(`🚀 [Acadiv Server]: Running at http://localhost:${PORT}`);
      console.log(`🩺 [Health Check]: http://localhost:${PORT}/api/v1/health\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();

export default app;
