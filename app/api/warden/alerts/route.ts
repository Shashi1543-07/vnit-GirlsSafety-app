import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const alerts = await prisma.activity.findMany({
            where: {
                type: {
                    in: ["SOS", "ALERT", "MISSED CHECK-IN"]
                },
                status: {
                    not: "RESOLVED"
                }
            },
            include: {
                user: {
                    select: {
                        name: true,
                        roomNo: true,
                        phone: true,
                        hostelName: true
                    }
                }
            },
            orderBy: {
                timestamp: 'desc'
            }
        });

        return NextResponse.json({ success: true, alerts });
    } catch (error) {
        console.error("Error fetching alerts:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
