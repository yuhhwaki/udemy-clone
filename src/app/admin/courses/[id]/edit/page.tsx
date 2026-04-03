import { CourseForm } from "@/components/admin/CourseForm";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateCourse } from "../../actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCoursePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (!course) notFound();

  const action = updateCourse.bind(null, id);

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
        <h1 className="text-2xl font-bold text-gray-900">コース編集</h1>
      </div>

      <div className="rounded-xl bg-white border border-gray-200 p-8">
        <CourseForm course={course} action={action} submitLabel="変更を保存する" />
      </div>
    </div>
  );
}
