import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { taskSchema } from '@/lib/validators';
import { z } from 'zod';

// We need to define the type for the specific route param
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const userId = request.headers.get('x-user-id');
        const { id } = await params;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        // Partial validation since updates might be partial
        const { title, description, status } = taskSchema.partial().parse(body);

        // Ensure task belongs to user
        const existingTask = await prisma.task.findFirst({
            where: { id, userId },
        });

        if (!existingTask) {
            return NextResponse.json({ error: 'Task not found or access denied' }, { status: 404 });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                title,
                description,
                status,
            },
        });

        return NextResponse.json({ task: updatedTask }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation failed', details: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const userId = request.headers.get('x-user-id');
        const { id } = await params;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Ensure task belongs to user
        const existingTask = await prisma.task.findFirst({
            where: { id, userId },
        });

        if (!existingTask) {
            return NextResponse.json({ error: 'Task not found or access denied' }, { status: 404 });
        }

        await prisma.task.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
