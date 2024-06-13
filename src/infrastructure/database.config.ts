import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { DATABASE_URL } = process.env;

const entities = [path.resolve(__dirname, '../domain/entities/*.{ts,js}')];
export const AppDataSource = new DataSource({
    type: 'postgres',
    url: DATABASE_URL,
    entities,
    synchronize: false,
    migrations: [path.resolve(__dirname, './migrations/*.{ts,js}')],
});
