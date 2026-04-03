import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ヒーローセクション */}
      <section className="bg-gray-900 text-white py-24 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            スキルアップを、今すぐ始めよう
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            プログラミング・デザイン・ビジネスなど幅広い分野のコースで、
            あなたのキャリアを加速させましょう。
          </p>
          <Link
            href="/courses"
            className="inline-block rounded-md bg-purple-600 px-8 py-3 text-base font-semibold text-white hover:bg-purple-700 transition-colors"
          >
            コース一覧を見る
          </Link>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            学習を続けられる理由
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                動画で学ぶ
              </h3>
              <p className="text-sm text-gray-600">
                いつでもどこでも、自分のペースで動画コンテンツを視聴できます。
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                進捗を管理
              </h3>
              <p className="text-sm text-gray-600">
                学習の進捗をパーセントで確認し、モチベーションを維持できます。
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                実践的なカリキュラム
              </h3>
              <p className="text-sm text-gray-600">
                現場で活かせる実践的な内容を体系的に学べます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="bg-purple-50 py-16 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            今すぐ学習を始めよう
          </h2>
          <p className="text-gray-600 mb-6">
            Googleアカウントで簡単にログインして、すべてのコースにアクセスできます。
          </p>
          <Link
            href="/courses"
            className="inline-block rounded-md bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
          >
            コースを探す
          </Link>
        </div>
      </section>
    </div>
  );
}
