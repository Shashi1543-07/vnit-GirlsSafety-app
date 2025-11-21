import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Admin
    await prisma.user.upsert({
        where: { email: 'admin@vnit.ac.in' },
        update: { role: 'ADMIN' },
        create: {
            email: 'admin@vnit.ac.in',
            name: 'Chief Warden',
            password: 'admin',
            role: 'ADMIN',
            phone: '+91 99999 88888',
            hostelName: 'Admin Block',
        },
    });

    // Student
    await prisma.user.upsert({
        where: { email: 'student@vnit.ac.in' },
        update: { role: 'STUDENT' },
        create: {
            email: 'student@vnit.ac.in',
            name: 'Priya Sharma',
            password: 'password',
            role: 'STUDENT',
            enrollmentNo: 'BT20CSE001',
            hostelName: 'Gargi Hostel',
            roomNo: '101',
            phone: '+91 98765 43210',
            emergencyContact: '+91 99887 76655',
        },
    });

    // Warden
    await prisma.user.upsert({
        where: { email: 'warden@vnit.ac.in' },
        update: { role: 'WARDEN' },
        create: {
            email: 'warden@vnit.ac.in',
            name: 'Mrs. Deshpande',
            password: 'warden',
            role: 'WARDEN',
            phone: '+91 88888 77777',
            hostelName: 'Gargi Hostel',
        },
    });

    // Security
    await prisma.user.upsert({
        where: { email: 'security@vnit.ac.in' },
        update: { role: 'SECURITY' },
        create: {
            email: 'security@vnit.ac.in',
            name: 'Security Control',
            password: 'security',
            role: 'SECURITY',
            phone: '+91 77777 66666',
            hostelName: 'Main Gate',
        },
    });

    console.log("Seeding completed.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
