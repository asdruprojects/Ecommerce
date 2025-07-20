import dotenv from 'dotenv';
dotenv.config();

interface Config {
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
}

const config: Config = {
    PORT: Number(process.env.PORT) || 3000,
    DATABASE_URL: process.env.DATABASE_URL || (() => { throw new Error('DATABASE_URL no definida') })(),
    JWT_SECRET: process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET no definida') })(),
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || (() => { throw new Error('JWT_EXPIRATION no definida') })(),
};

export default config;