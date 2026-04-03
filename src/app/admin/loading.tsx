/** 管理者ページの共通ローディング */
export default function AdminLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl bg-white border border-gray-200 p-6">
            <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
