import Link from 'next/link';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function PostCard({ post }) {
  const imageUrl = post?.small_image?.data?.attributes?.url
    ? `https://suitmedia-backend.suitdev.com${post.small_image.data.attributes.url}`
    : '/default-banner.jpg';

  const title = post?.title || 'Judul tidak tersedia';
  const publishedAt = post?.published_at
    ? format(new Date(post.published_at), 'd MMMM yyyy', { locale: id })
    : 'Tanggal tidak tersedia';

  const slug = post?.slug || post?.id;

  return (
    
    <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 flex flex-col justify-between bg-white">
      <img
        src={imageUrl}
        alt={title}
        className="w-full aspect-[4/3] object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="line-clamp-3 font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">{publishedAt}</p>
        <Link
          href={`/ideas/${slug}`}
          className="text-sm text-blue-600 hover:underline mt-auto"
        >
          Baca selengkapnya →
        </Link>
      </div>
      
    </div>
    
  );
  
}