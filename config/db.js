import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jobconnect';

  try {
    // Attempt standard connection first
    console.log(`[Database] Attempting connection to MongoDB at: ${uri.replace(/\/\/.*@/, '//<credentials>@')}...`);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (primaryError) {
    console.warn(`[Database] Notice: Standard MongoDB connection to ${uri} failed (${primaryError.message}).`);
    
    // In development mode, provide automatic in-memory MongoDB fallback
    if (process.env.NODE_ENV !== 'production') {
      try {
        console.log('[Database] Starting in-memory MongoDB development server...');
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        const memUri = mongod.getUri();
        const conn = await mongoose.connect(memUri);
        console.log(`[Database] In-Memory MongoDB running successfully at ${memUri}`);
        return conn;
      } catch (memError) {
        console.error('[Database] Failed to launch in-memory MongoDB fallback:', memError.message);
        throw primaryError;
      }
    } else {
      throw primaryError;
    }
  }
};

