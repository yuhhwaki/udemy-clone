"use client";

import { deleteLecture } from "@/app/admin/courses/[id]/lectures/actions";

type Props = {
  courseId: string;
  lectureId: string;
  lectureTitle: string;
};

/** レクチャー削除ボタン（確認ダイアログ付き） */
export const DeleteLectureButton = ({
  courseId,
  lectureId,
  lectureTitle,
}: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm(`「${lectureTitle}」を削除しますか？`)) {
      e.preventDefault();
    }
  };

  return (
    <form
      action={deleteLecture.bind(null, courseId, lectureId)}
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className="text-xs text-red-400 hover:text-red-600"
      >
        削除
      </button>
    </form>
  );
};
