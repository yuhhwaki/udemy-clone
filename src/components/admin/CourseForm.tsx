"use client";

import type { Course, CourseCategory } from "@/types/course";

const CATEGORIES: CourseCategory[] = [
  "プログラミング",
  "デザイン",
  "ビジネス",
  "マーケティング",
  "その他",
];

type Props = {
  /** 編集時は既存のコースデータを渡す */
  course?: Course;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
};

/** コース作成・編集フォーム（共用） */
export const CourseForm = ({ course, action, submitLabel }: Props) => {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      {/* タイトル */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          タイトル <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          defaultValue={course?.title}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="例: Next.js完全入門"
        />
      </div>

      {/* 説明 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          説明
        </label>
        <textarea
          name="description"
          defaultValue={course?.description ?? ""}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          placeholder="コースの概要を入力してください"
        />
      </div>

      {/* カテゴリ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          カテゴリ
        </label>
        <select
          name="category"
          defaultValue={course?.category ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">未設定</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* サムネイルURL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          サムネイルURL
        </label>
        <input
          type="url"
          name="thumbnail_url"
          defaultValue={course?.thumbnail_url ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="https://..."
        />
      </div>

      <button
        type="submit"
        className="self-start rounded-md bg-purple-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
};
