import { CourseForm } from "@/components/admin/CourseForm";
import Link from "next/link";
import { createCourse } from "../actions";

export default function NewCoursePage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/courses"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← コース一覧
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-2xl font-bold text-gray-900">新規コース作成</h1>
      </div>

      <div className="rounded-xl bg-white border border-gray-200 p-8">
        <CourseForm action={createCourse} submitLabel="コースを作成する" />
      </div>
    </div>
  );
}
