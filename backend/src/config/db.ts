import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from backend directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Connects to MongoDB database using Mongoose
 */
export async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI || MONGODB_URI.includes('<username>') || MONGODB_URI.includes('<password>')) {
    console.error('\n' + '='.repeat(70));
    console.error('❌ [MongoDB Error]: Valid MONGODB_URI is not set in backend/.env!');
    console.error('👉 Please open "backend/.env" and paste your real MongoDB connection string:');
    console.error('   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/acadiv');
    console.error('='.repeat(70) + '\n');
    throw new Error('MONGODB_URI missing or contains unconfigured placeholders in backend/.env');
  }

  try {
    console.log('🔄 Connecting to MongoDB...');
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10s timeout
    });

    console.log('\n' + '='.repeat(70));
    console.log(`✅ [MongoDB Connected]: ${conn.connection.host}`);
    console.log(`📦 [Database Name]: ${conn.connection.name}`);
    console.log('='.repeat(70) + '\n');

    return conn;
  } catch (error: any) {
    console.error('\n' + '='.repeat(70));
    console.error('❌ [MongoDB Connection Failed]:', error.message || error);
    console.error('💡 Quick Troubleshooting:');
    console.error('   1. Check if your MongoDB username & password in backend/.env are correct.');
    console.error('   2. In MongoDB Atlas, ensure Network Access allows 0.0.0.0/0 (or your current IP).');
    console.error('   3. Check your internet connection.');
    console.error('='.repeat(70) + '\n');
    throw error;
  }
}

/**
 * Disconnects from MongoDB (for clean shutdowns & tests)
 */
export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  console.log('🔌 [MongoDB] Disconnected.');
}

// Connection event listeners
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ [MongoDB] Connection lost. Attempting reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ [MongoDB] Reconnected successfully.');
});
