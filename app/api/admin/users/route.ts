import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        // In a real app, verify Admin session here!

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                hostelName: true,
                roomNo: true,
                isVerified: true,
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ success: true, users });
    } catch (error) {
        console.error("Admin Users Fetch Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
