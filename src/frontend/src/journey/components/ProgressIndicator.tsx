import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  progress: number;
}

export function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <Progress value={progress} className="flex-1" />
          <span className="text-sm font-medium text-gray-700 min-w-[4rem]">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
