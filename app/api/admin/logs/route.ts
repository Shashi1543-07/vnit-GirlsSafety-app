import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // Mock System Logs
    const logs = [
        { id: 1, level: "INFO", message: "System backup completed successfully", timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
        { id: 2, level: "WARN", message: "High latency detected in South Campus Node", timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
        { id: 3, level: "ERROR", message: "Failed login attempt from IP 192.168.1.105", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
        { id: 4, level: "INFO", message: "New user registration: Ankit Kumar", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
        { id: 5, level: "INFO", message: "Warden Dashboard accessed by Mrs. Deshpande", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString() },
    ];

    return NextResponse.json({ success: true, logs });
}
