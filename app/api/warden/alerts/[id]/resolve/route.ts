import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const updatedActivity = await prisma.activity.update({
            where: { id },
            data: { status: "RESOLVED" }
        });

        return NextResponse.json({ success: true, activity: updatedActivity });
    } catch (error) {
        console.error("Error resolving alert:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
