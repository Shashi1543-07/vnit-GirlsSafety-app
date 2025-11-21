import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name, email, password, phone, role,
            enrollmentNo, employeeId, hostelName, roomNo, emergencyContact
        } = body;

        // Check if user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    ...(enrollmentNo ? [{ enrollmentNo }] : []),
                    ...(employeeId ? [{ employeeId }] : []),
                ],
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists with this Email, Enrollment No, or Employee ID." },
                { status: 400 }
            );
        }

        // Role-specific validation
        if (role === "STUDENT" && !enrollmentNo) {
            return NextResponse.json({ error: "Enrollment No is required for Students" }, { status: 400 });
        }
        if ((role === "WARDEN" || role === "SECURITY") && !employeeId) {
            return NextResponse.json({ error: "Employee ID is required for Staff" }, { status: 400 });
        }

        // Create new user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password, // In real app, hash this!
                phone,
                role: role || "STUDENT",
                enrollmentNo: role === "STUDENT" ? enrollmentNo : null,
                employeeId: role !== "STUDENT" ? employeeId : null,
                hostelName, // Used as "Assigned Location" for staff
                roomNo,     // Used as "Office/Post" for staff
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
