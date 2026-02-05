import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ensure this matches your alias setup, or use relative path '../../../../lib/prisma'
import { registerSchema } from '@/lib/validators';
import { hashPassword } from '@/lib/auth';
import { z } from 'zod';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, role } = registerSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: role || 'USER',
            },
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });

        return NextResponse.json(
            { message: 'User created successfully', user },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Internal User Error' },
            { status: 500 }
        );
    }
}
