import BlogDetailClient from "../[id]/BlogDetailClient";

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  return <BlogDetailClient id={params.id} />;
}
