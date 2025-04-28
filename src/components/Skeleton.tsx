import { Skeleton } from "./ui/skeleton";

interface SkeletonProps {
    type: 'card' | 'text' | 'list';
}

const SkeletonComponent: React.FC<SkeletonProps> = ({ type }) => {
    if (type === 'card') {
        return (
            <div className="animate-pulse flex space-x-4 w-1/3">
                <div className="rounded-full bg-gray-400 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-2 bg-gray-400 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-2 bg-gray-400 rounded"></div>
                        <div className="h-2 bg-gray-400 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        );
    } else if (type === 'text') {
        return (
            <div className="animate-pulse space-y-2">
                <div className="h-2 bg-gray-400 rounded w-full"></div>
                <div className="h-2 bg-gray-400 rounded w-5/6"></div>
                <div className="h-2 bg-gray-400 rounded w-4/6"></div>
            </div>
        );
    } else if (type === 'list') {
        return (
            Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="h-10 w-32 rounded-full bg-gray-200"
                />
              ))
        );
    }
    return null;
};
export default SkeletonComponent;