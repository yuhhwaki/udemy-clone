import Link from "next/link";

const NAV_ITEMS = [
  { href: "/admin", label: "ダッシュボード", icon: "📊" },
  { href: "/admin/courses", label: "コース管理", icon: "🎓" },
  { href: "/admin/students", label: "受講者一覧", icon: "👥" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-57px)] bg-gray-100">
      {/* サイドバー */}
      <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-200">
        <div className="px-4 py-5 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            管理者メニュー
          </p>
        </div>
        <nav className="p-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
