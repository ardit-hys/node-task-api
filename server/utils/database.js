import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

const client = new Client({
  host: "localhost",
  user: "ardit",
  port: 5432,
  password: process.env.DB_PASSWORD.toString(),
  database: "postgres",
});

export const connectDb = async () => {
  try {
    await client.connect();
    console.log("Connected to Postgres DB");
  } catch (error) {
    console.log("Error connecting to Postgres DB", error);
  }
};

export default client;
