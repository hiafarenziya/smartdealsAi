-- Enable UUID extension for PostgreSQL
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- This extension enables gen_random_uuid() function
-- Required for UUID primary keys in our tables