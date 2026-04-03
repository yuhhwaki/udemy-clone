/** コース詳細のスケルトンローディング */
export default function CourseDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-gray-900 py-10 px-4">
        <div className="mx-auto max-w-5xl flex flex-col gap-4 md:flex-row">
          <div className="flex-1 flex flex-col gap-3">
            <div className="h-4 w-20 bg-gray-700 rounded-full animate-pulse" />
            <div className="h-8 w-3/4 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="w-full md:w-72 aspect-video bg-gray-700 rounded-lg animate-pulse flex-shrink-0" />
        </div>
      </div>
      {/* コンテンツ */}
      <div className="mx-auto max-w-5xl px-4 py-8 flex gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="h-12 bg-gray-100 animate-pulse" />
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-10 border-b border-gray-100 bg-white animate-pulse" />
              ))}
            </div>
          ))}
        </div>
        <div className="hidden md:block w-64 h-40 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
      </div>
    </div>
  );
}
