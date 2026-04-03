/** コース一覧のスケルトンローディング */
export default function CoursesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-6" />
      {/* フィルターバー */}
      <div className="flex gap-2 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
      {/* カードグリッド */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="aspect-video bg-gray-200 animate-pulse" />
            <div className="p-4 flex flex-col gap-2">
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
