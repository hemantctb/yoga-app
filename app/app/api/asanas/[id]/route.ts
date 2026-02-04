import { NextResponse } from 'next/server';
import { getAsanaById } from '@/lib/asanas';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const asana = await getAsanaById(id);

    if (!asana) {
      return NextResponse.json(
        { error: 'Asana not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(asana);
  } catch (error) {
    console.error('Error fetching asana:', error);
    return NextResponse.json(
      { error: 'Failed to fetch asana' },
      { status: 500 }
    );
  }
}
