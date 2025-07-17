import { Suspense, useState, useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import PostCard from '../components/PostCard';
import { fetchIdeas } from '../lib/api';
import SearchParamsClient from '../components/SearchParamsClient';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('-published_at');
  const [totalItems, setTotalItems] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const router = useRouter();

  useEffect(() => {
    fetchIdeas({ page, size, sort }).then(res => {
      setPosts(Array.isArray(res?.data) ? res.data : []);
      setTotalItems(res?.meta?.pagination?.total || 0);
      setPageCount(res?.meta?.pagination?.pageCount || 1);
    });
  }, [page, size, sort]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('size', size);
    params.set('sort', sort);
    router.replace(`?${params.toString()}`);
  }, [page, size, sort, router]);

  const handleSearchParamsUpdate = ({ page, size, sort }) => {
    setPage(page);
    setSize(size);
    setSort(sort);
  };

  const getVisiblePages = () => {
    const delta = 2;
    const pages = [];
    for (let i = Math.max(1, page - delta); i <= Math.min(pageCount, page + delta); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <Header />
      <Banner imageUrl="/default-banner.jpg" text="Ideas & Insights" />

      {/* Suspense boundary untuk komponen pencarian */}
      <Suspense fallback={<div className="p-4">Memuat filter pencarian...</div>}>
        <SearchParamsClient onUpdate={handleSearchParamsUpdate} />
      </Suspense>

      <div className="flex flex-wrap justify-between items-center px-4 mt-6 gap-4">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * size + 1} - {Math.min(page * size, totalItems)} of {totalItems}
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Sort By:</label>
          <select
            value={sort}
            onChange={e => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="border p-1 rounded"
          >
            <option value="-published_at">Terbaru</option>
            <option value="published_at">Terlama</option>
          </select>

          <label className="text-sm font-medium">Show per page:</label>
          <select
            value={size}
            onChange={e => {
              setSize(Number(e.target.value));
              setPage(1);
            }}
            className="border p-1 rounded"
          >
            {[10, 20, 50].map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-5 gap-6 p-4">
        {Array.isArray(posts) && posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      <div className="flex justify-center items-center gap-2 py-6 flex-wrap">
        <button onClick={() => setPage(1)} disabled={page === 1} className="px-2 py-1 border rounded disabled:opacity-40">«</button>
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1} className="px-2 py-1 border rounded disabled:opacity-40">‹</button>

        {getVisiblePages().map(num => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 rounded ${num === page ? 'bg-orange-500 text-white' : 'border'}`}
          >
            {num}
          </button>
        ))}

        <button onClick={() => setPage(prev => Math.min(prev + 1, pageCount))} disabled={page === pageCount} className="px-2 py-1 border rounded disabled:opacity-40">›</button>
        <button onClick={() => setPage(pageCount)} disabled={page === pageCount} className="px-2 py-1 border rounded disabled:opacity-40">»</button>
      </div>
    </>
  );
}