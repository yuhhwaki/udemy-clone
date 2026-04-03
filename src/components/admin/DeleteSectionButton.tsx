"use client";

import { deleteSection } from "@/app/admin/courses/[id]/lectures/actions";

type Props = {
  courseId: string;
  sectionId: string;
  sectionTitle: string;
};

/** セクション削除ボタン（確認ダイアログ付き） */
export const DeleteSectionButton = ({
  courseId,
  sectionId,
  sectionTitle,
}: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (
      !confirm(
        `セクション「${sectionTitle}」を削除しますか？\nこのセクションのレクチャーもすべて削除されます。`
      )
    ) {
      e.preventDefault();
    }
  };

  return (
    <form
      action={deleteSection.bind(null, courseId, sectionId)}
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className="text-xs text-red-500 hover:text-red-700"
      >
        セクションを削除
      </button>
    </form>
  );
};
