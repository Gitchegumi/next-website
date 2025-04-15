import dynamic from 'next/dynamic';

const SearchResultsPage = dynamic(() => import('@/components/pages/Search'), { ssr: false });

export default function Page() {
  return <SearchResultsPage />;
}