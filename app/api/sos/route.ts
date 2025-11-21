import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { latitude, longitude, type } = body;

        const cookieStore = await cookies();
        const userId = cookieStore.get("userId")?.value;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const activity = await prisma.activity.create({
            data: {
                type: type || 'Alert',
                description: `SOS Triggered! Location: ${latitude}, ${longitude}`,
                status: 'Active',
                userId: user.id,
            },
        });

        // Simulate delay for "Sending Alerts..."
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({ success: true, activity });
    } catch (error) {
        console.error('Error processing SOS:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
