"use client";

import { deleteCourse } from "@/app/admin/courses/actions";

type Props = {
  courseId: string;
  courseTitle: string;
};

/** コース削除ボタン（確認ダイアログ付き） */
export const DeleteCourseButton = ({ courseId, courseTitle }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm(`「${courseTitle}」を削除しますか？この操作は取り消せません。`)) {
      e.preventDefault();
    }
  };

  return (
    <form action={deleteCourse.bind(null, courseId)} onSubmit={handleSubmit}>
      <button
        type="submit"
        className="rounded px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
      >
        削除
      </button>
    </form>
  );
};
