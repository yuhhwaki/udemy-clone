import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function AdminStudentsPage() {
  const supabase = await createServerSupabaseClient();

  // studentロールのユーザーを取得
  const { data: students } = await supabase
    .from("users")
    .select("id, name, email, avatar_url, created_at")
    .eq("role", "student")
    .order("created_at", { ascending: false });

  // 全レクチャー数を取得
  const { count: totalLectures } = await supabase
    .from("lectures")
    .select("*", { count: "exact", head: true });

  // 各ユーザーの完了レクチャー数を取得
  const { data: progressData } = await supabase
    .from("progress")
    .select("user_id, lecture_id");

  // ユーザーIDごとの完了数をマップ化
  const completedCountMap = (progressData ?? []).reduce<Record<string, number>>(
    (acc, row) => {
      acc[row.user_id] = (acc[row.user_id] ?? 0) + 1;
      return acc;
    },
    {}
  );

  const total = totalLectures ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">受講者一覧</h1>

      {!students || students.length === 0 ? (
        <div className="rounded-xl bg-white border border-gray-200 p-12 text-center text-gray-500">
          受講者がまだいません
        </div>
      ) : (
        <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ユーザー
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  登録日
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  進捗（完了レクチャー数）
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  進捗率
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => {
                const completed = completedCountMap[student.id] ?? 0;
                const percent =
                  total === 0 ? 0 : Math.round((completed / total) * 100);

                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {student.avatar_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={student.avatar_url}
                            alt={student.name ?? ""}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                            👤
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {student.name ?? "名前なし"}
                          </p>
                          <p className="text-xs text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(student.created_at).toLocaleDateString("ja-JP")}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {completed} / {total}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-600 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {percent}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
