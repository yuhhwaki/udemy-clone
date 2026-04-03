"use client";

import { toggleLectureCompletion } from "@/app/courses/[id]/learn/actions";
import type { Lecture, SectionWithLectures } from "@/types/course";
import Link from "next/link";
import { useState, useTransition } from "react";
import { CurriculumSidebar } from "./CurriculumSidebar";
import { VideoPlayer } from "./VideoPlayer";

type Props = {
  courseId: string;
  courseTitle: string;
  sections: SectionWithLectures[];
  currentLecture: Lecture;
  completedLectureIds: string[];
  totalLectures: number;
};

/** 学習画面のメインクライアントコンポーネント */
export const LearnClient = ({
  courseId,
  courseTitle,
  sections,
  currentLecture,
  completedLectureIds,
  totalLectures,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  // モバイル用サイドバー開閉状態
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isCompleted = completedLectureIds.includes(currentLecture.id);

  // 進捗率を計算
  const progressPercent =
    totalLectures === 0
      ? 0
      : Math.round((completedLectureIds.length / totalLectures) * 100);

  // 次のレクチャーを取得
  const allLectures = sections
    .sort((a, b) => a.order - b.order)
    .flatMap((s) => s.lectures.sort((a, b) => a.order - b.order));
  const currentIndex = allLectures.findIndex((l) => l.id === currentLecture.id);
  const nextLecture = allLectures[currentIndex + 1] ?? null;

  const handleToggleCompletion = () => {
    startTransition(async () => {
      await toggleLectureCompletion(currentLecture.id, courseId, isCompleted);
    });
  };

  const sidebar = (
    <CurriculumSidebar
      courseId={courseId}
      sections={sections}
      currentLectureId={currentLecture.id}
      completedLectureIds={completedLectureIds}
      progressPercent={progressPercent}
    />
  );

  return (
    <div className="flex h-[calc(100vh-57px)] relative">
      {/* モバイル用オーバーレイ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* モバイル用ドロワーサイドバー */}
      <div
        className={`fixed inset-y-0 right-0 z-30 w-80 transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {sidebar}
      </div>

      {/* メインエリア */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-gray-950">
        {/* 動画プレーヤー */}
        <div className="w-full max-w-5xl mx-auto px-4 pt-6">
          <VideoPlayer title={currentLecture.title} />
        </div>

        {/* レクチャー情報・操作エリア */}
        <div className="w-full max-w-5xl mx-auto px-4 py-6 flex flex-col gap-4">
          {/* コースタイトルのパンくず */}
          <Link
            href={`/courses/${courseId}`}
            className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← {courseTitle}
          </Link>

          {/* レクチャータイトルと操作ボタン */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-lg font-bold text-white leading-tight sm:text-xl">
              {currentLecture.title}
            </h1>

            <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
              {/* モバイル用カリキュラム表示ボタン */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors lg:hidden"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                カリキュラム
              </button>

              {/* 完了チェックボタン */}
              <button
                onClick={handleToggleCompletion}
                disabled={isPending}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
                  isCompleted
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {isCompleted ? (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    完了済み
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" strokeWidth={2} />
                    </svg>
                    完了にする
                  </>
                )}
              </button>

              {/* 次のレクチャーへ */}
              {nextLecture && (
                <Link
                  href={`/courses/${courseId}/learn?lectureId=${nextLecture.id}`}
                  className="flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                >
                  次へ
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* 進捗ステータス */}
          <p className="text-xs text-gray-500">
            {completedLectureIds.length} / {totalLectures} レクチャー完了（{progressPercent}%）
          </p>
        </div>
      </div>

      {/* PC用固定サイドバー */}
      <div className="w-72 flex-shrink-0 hidden lg:block">
        {sidebar}
      </div>
    </div>
  );
};
