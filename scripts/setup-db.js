import pg from 'pg';

const { Client } = pg;

async function setupDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database...');
    
    // Enable pgcrypto extension for UUID generation
    await client.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
    console.log('✅ pgcrypto extension enabled');
    
    await client.end();
    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();