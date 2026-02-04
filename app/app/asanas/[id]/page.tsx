import { getAsanaById, getAllAsanas } from '@/lib/asanas';
import { notFound } from 'next/navigation';
import AsanaDetailClient from './AsanaDetailClient';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const asanas = await getAllAsanas();
  return asanas.map((asana) => ({
    id: asana.id,
  }));
}

interface AsanaDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AsanaDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const asana = await getAsanaById(id);

  if (!asana) {
    return {
      title: 'Asana Not Found | Sutra',
    };
  }

  const title = `${asana.names.english} (${asana.names.sanskrit}) | Sutra`;
  const description = asana.description || `Learn ${asana.names.english} with detailed alignment cues, anatomy breakdowns, and teaching tips. Master this ${asana.difficulty_level} ${asana.category.join(', ')} pose.`;

  return {
    title,
    description,
    keywords: [
      asana.names.english,
      asana.names.sanskrit,
      'yoga pose',
      'asana',
      ...asana.category,
      asana.difficulty_level,
      'yoga cueing',
      'yoga teaching',
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

export default async function AsanaDetailPage({ params }: AsanaDetailPageProps) {
  const { id } = await params;
  const asana = await getAsanaById(id);

  if (!asana) {
    notFound();
  }

  return <AsanaDetailClient asana={asana} />;
}
