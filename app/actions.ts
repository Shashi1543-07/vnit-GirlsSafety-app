"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getUserProfile(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                contacts: true,
                activities: {
                    orderBy: { timestamp: "desc" },
                    take: 5,
                },
            },
        });
        return user;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}

export async function getContacts(userId: string) {
    try {
        const contacts = await prisma.contact.findMany({
            where: { userId },
        });
        return contacts;
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return [];
    }
}

export async function addContact(userId: string, data: { name: string; phone: string; type: string }) {
    try {
        const contact = await prisma.contact.create({
            data: {
                ...data,
                userId,
            },
        });
        revalidatePath("/dashboard/contacts");
        return contact;
    } catch (error) {
        console.error("Error adding contact:", error);
        throw new Error("Failed to add contact");
    }
}

export async function deleteContact(contactId: string) {
    try {
        await prisma.contact.delete({
            where: { id: contactId },
        });
        revalidatePath("/dashboard/contacts");
    } catch (error) {
        console.error("Error deleting contact:", error);
        throw new Error("Failed to delete contact");
    }
}

export async function getRecentActivity(userId: string) {
    try {
        const activities = await prisma.activity.findMany({
            where: { userId },
            orderBy: { timestamp: "desc" },
            take: 10,
        });
        return activities;
    } catch (error) {
        console.error("Error fetching activities:", error);
        return [];
    }
}
