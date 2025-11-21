import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name, email, password, phone, role,
            enrollmentNo, hostelName, roomNo, emergencyContact
        } = body;

        // Check if user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { enrollmentNo },
                ],
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists with this Email or Enrollment No." },
                { status: 400 }
            );
        }

        // Create new user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password, // In real app, hash this!
                phone,
                role: role || "STUDENT",
                enrollmentNo,
                hostelName,
                roomNo,
                emergencyContact,
                isVerified: false, // Requires admin approval or ID check
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
