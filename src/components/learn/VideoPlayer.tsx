"use client";

type Props = {
  title: string;
};

/** ダミー動画プレーヤー */
export const VideoPlayer = ({ title }: Props) => {
  return (
    <div className="relative w-full aspect-video bg-gray-900 flex flex-col items-center justify-center rounded-lg overflow-hidden">
      {/* ダミー再生ボタン */}
      <div className="flex flex-col items-center gap-4 text-white">
        <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
          <svg
            className="h-10 w-10 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-sm text-gray-400">動画は準備中です</p>
        <p className="text-xs text-gray-500 max-w-xs text-center">{title}</p>
      </div>
    </div>
  );
};
