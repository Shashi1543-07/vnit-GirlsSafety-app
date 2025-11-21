import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, role } = body;

        // For OTP flow, we first check if user exists
        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found. Please Register first." },
                { status: 404 }
            );
        }

        // Verify Role matches
        if (user.role !== role) {
            return NextResponse.json(
                { error: `Access denied. You are not registered as a ${role}` },
                { status: 403 }
            );
        }

        // Set a simple session cookie
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

        response.cookies.set("userId", user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
