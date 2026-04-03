/** コースカテゴリ */
export type CourseCategory =
  | "プログラミング"
  | "デザイン"
  | "ビジネス"
  | "マーケティング"
  | "その他";

/** coursesテーブルの型 */
export type Course = {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  category: CourseCategory | null;
  instructor_id: string;
  created_at: string;
};

/** コース一覧用（セクション数を含む） */
export type CourseWithSectionCount = Course & {
  section_count: number;
};

/** sectionsテーブルの型 */
export type Section = {
  id: string;
  course_id: string;
  title: string;
  order: number;
};

/** lecturesテーブルの型 */
export type Lecture = {
  id: string;
  section_id: string;
  title: string;
  video_url: string | null;
  duration: number | null;
  order: number;
};

/** セクションとレクチャーを結合した型（コース詳細用） */
export type SectionWithLectures = Section & {
  lectures: Lecture[];
};
