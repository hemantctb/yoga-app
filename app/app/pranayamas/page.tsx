import { getAllPranayamas, getPranayamaCategories } from '@/lib/pranayamas';
import PranayamasList from './PranayamasList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pranayama | Sutra',
  description: 'Explore our comprehensive library of pranayama breathing techniques with detailed instructions, benefits, and safety guidelines. Perfect for yoga teachers and practitioners.',
  keywords: ['pranayama', 'breathing techniques', 'yoga breathing', 'breathwork', 'yoga teaching'],
  openGraph: {
    title: 'Pranayama | Sutra',
    description: 'Explore our comprehensive library of pranayama breathing techniques with detailed instructions, benefits, and safety guidelines.',
    type: 'website',
  },
};

export default async function PranayamasPage() {
  const pranayamas = await getAllPranayamas();
  const categories = getPranayamaCategories();

  return <PranayamasList pranayamas={pranayamas} categories={categories} />;
}
