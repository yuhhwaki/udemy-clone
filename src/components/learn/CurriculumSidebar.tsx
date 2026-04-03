"use client";

import type { SectionWithLectures } from "@/types/course";
import Link from "next/link";

type Props = {
  courseId: string;
  sections: SectionWithLectures[];
  currentLectureId: string;
  completedLectureIds: string[];
  /** 進捗率（0〜100） */
  progressPercent: number;
};

/** 秒数を「X分」形式に変換する */
const formatDuration = (seconds: number | null): string => {
  if (!seconds) return "";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}分`;
};

/** カリキュラムサイドバー */
export const CurriculumSidebar = ({
  courseId,
  sections,
  currentLectureId,
  completedLectureIds,
  progressPercent,
}: Props) => {
  return (
    <aside className="flex flex-col h-full bg-white border-l border-gray-200">
      {/* 進捗率ヘッダー */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-800">コース進捗</span>
          <span className="text-sm font-bold text-purple-600">
            {progressPercent}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* セクション・レクチャー一覧 */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.id}>
            {/* セクションタイトル */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <p className="text-xs font-semibold text-gray-700 leading-tight">
                {section.title}
              </p>
            </div>

            {/* レクチャー一覧 */}
            {section.lectures
              .sort((a, b) => a.order - b.order)
              .map((lecture) => {
                const isCompleted = completedLectureIds.includes(lecture.id);
                const isCurrent = lecture.id === currentLectureId;

                return (
                  <Link
                    key={lecture.id}
                    href={`/courses/${courseId}/learn?lectureId=${lecture.id}`}
                    className={`flex items-start gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      isCurrent ? "bg-purple-50 border-l-2 border-l-purple-600" : ""
                    }`}
                  >
                    {/* 完了チェックアイコン */}
                    <div
                      className={`mt-0.5 flex-shrink-0 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                        isCompleted
                          ? "bg-purple-600 border-purple-600"
                          : "border-gray-300"
                      }`}
                    >
                      {isCompleted && (
                        <svg
                          className="h-2.5 w-2.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>

                    {/* レクチャー情報 */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs leading-snug ${
                          isCurrent
                            ? "font-semibold text-purple-700"
                            : "text-gray-700"
                        }`}
                      >
                        {lecture.title}
                      </p>
                      {lecture.duration && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {formatDuration(lecture.duration)}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
          </div>
        ))}
      </div>
    </aside>
  );
};
