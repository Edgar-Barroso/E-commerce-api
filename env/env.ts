import dotenv from 'dotenv';
dotenv.config();
import {z} from 'zod'

const schema = z.object({
    DATABASE_URL:z.string(),
})

export const {DATABASE_URL} = schema.parse(process.env)