import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const trips = await prisma.trip.findMany({
            where: {
                status: {
                    in: ["ACTIVE", "DELAYED"]
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
                startTime: 'desc'
            }
        });

        return NextResponse.json({ success: true, trips });
    } catch (error) {
        console.error("Error fetching trips:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
