import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { faker } from '@faker-js/faker';

async function seed() {
    console.log("Clearing the previous database")
    //delete order important here
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()
    
    console.log("Seeding the database")

    for (let i = 0; i < 3; i++) {
        await prisma.user.create({
            data: {
                username: faker.internet.userName(),
                password: faker.internet.password(),
                posts: {
                    create: [
                        { title: faker.word.words({ count: {min: 2, max: 6}}), content: faker.word.words({ count: {min:5, max: 30}}) },
                        { title: faker.word.words({ count: {min: 2, max: 6}}), content: faker.word.words({ count: {min:5, max: 30}}) },
                        { title: faker.word.words({ count: {min: 2, max: 6}}), content: faker.word.words({ count: {min:5, max: 30}}) }
                    ]
                }
                
            }
        })
    }
    console.log("Database seeded")
}

seed().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})