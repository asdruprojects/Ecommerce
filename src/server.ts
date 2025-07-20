import config from './config/env.config';
import app from './app'
import { PrismaClient } from '../generated/prisma';

export const prismaClient = new PrismaClient();

async function main() {
    try {
        await prismaClient.$connect();
        app.listen(config.PORT, () => {
            console.log(`Server running on port: ${config.PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        await prismaClient.$disconnect();
        process.exit(1);
    }
}

main();
