import { connectDB, disconnectDB } from './config/db';

async function testConnection() {
  console.log('\n--- ACADIV DATABASE CONNECTION TEST ---');
  try {
    const conn = await connectDB();
    console.log('🎉 Verification Successful! Connection is alive and ready.');
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('💥 Verification Failed. Please check the error above.');
    process.exit(1);
  }
}

testConnection();
