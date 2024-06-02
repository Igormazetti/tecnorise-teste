export default function TableLoadingSkeleton() {
  return (
    <div
      role="status"
      className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_itm, idx) => (
          <div key={idx} className="flex justify-between py-2 gap-4">
            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-[300px]"></div>
            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-[300px]"></div>
            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
        ))}
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
