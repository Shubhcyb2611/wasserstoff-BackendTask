import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const {
    PORT,
    JWT_SECRET,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    GOOGLE_MAP_API_KEY,
    UPLOADS_PATH,
    ENV,
    DATABASE_URL,
} = process.env;
