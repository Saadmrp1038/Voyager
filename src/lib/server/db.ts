import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as dotenv from 'dotenv'

dotenv.config()
// console.log(process.env.DATABASE_URL)

const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString);
const db = drizzle(client, { schema });

export default db;