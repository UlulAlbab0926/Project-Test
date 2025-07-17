'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SearchParamsClient({ onUpdate }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageFromURL = parseInt(searchParams.get('page')) || 1;
    const sizeFromURL = parseInt(searchParams.get('size')) || 10;
    const sortFromURL = searchParams.get('sort') || '-published_at';

    onUpdate({ page: pageFromURL, size: sizeFromURL, sort: sortFromURL });
  }, [searchParams, onUpdate]);

  return null;
}