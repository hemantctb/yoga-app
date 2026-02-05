import { getPranayamaById, getAllPranayamas } from '@/lib/pranayamas';
import { notFound } from 'next/navigation';
import PranayamaDetailClient from './PranayamaDetailClient';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const pranayamas = await getAllPranayamas();
  return pranayamas.map((pranayama) => ({
    id: pranayama.id,
  }));
}

interface PranayamaDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PranayamaDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const pranayama = await getPranayamaById(id);

  if (!pranayama) {
    return {
      title: 'Pranayama Not Found | Sutra',
    };
  }

  const title = `${pranayama.names.english} (${pranayama.names.sanskrit}) | Sutra`;
  const description = pranayama.description || `Learn ${pranayama.names.english} breathing technique with detailed instructions, benefits, and safety guidelines. Master this ${pranayama.difficulty_level} pranayama.`;

  return {
    title,
    description,
    keywords: [
      pranayama.names.english,
      pranayama.names.sanskrit,
      'pranayama',
      'breathing technique',
      'breathwork',
      ...pranayama.category,
      pranayama.difficulty_level,
      'yoga breathing',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function PranayamaDetailPage({ params }: PranayamaDetailPageProps) {
  const { id } = await params;
  const pranayama = await getPranayamaById(id);

  if (!pranayama) {
    notFound();
  }

  return <PranayamaDetailClient pranayama={pranayama} />;
}
