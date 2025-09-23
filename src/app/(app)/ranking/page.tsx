import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const TrainRanking = dynamic(() => import('@/components/ranking/train-ranking').then(mod => mod.TrainRanking), {
  ssr: false,
  loading: () => (
    <div className="space-y-6">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  )
});

export default function RankingPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Train Induction Ranking</h1>
      </div>
      <p className="text-muted-foreground">
        Use the AI-powered optimizer to rank available trains for induction based on multiple factors.
      </p>
      <TrainRanking />
    </div>
  );
}
