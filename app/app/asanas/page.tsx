import { getAllAsanas, getCategories } from '@/lib/asanas';
import AsanasList from './AsanasList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asana Library | Sutra',
  description: 'Explore our comprehensive library of yoga poses with detailed anatomical breakdowns, alignment cues, and teaching tips. Perfect for yoga teachers and practitioners.',
  keywords: ['yoga poses', 'asana library', 'yoga teaching', 'alignment cues', 'yoga anatomy'],
  openGraph: {
    title: 'Asana Library | Sutra',
    description: 'Explore our comprehensive library of yoga poses with detailed anatomical breakdowns, alignment cues, and teaching tips.',
    type: 'website',
  },
};

export default async function AsanasPage() {
  const asanas = await getAllAsanas();
  const categories = getCategories();

  return <AsanasList asanas={asanas} categories={categories} />;
}
