# 要件定義 - Udemyクローン（講座管理アプリ）

## アプリ概要
オンライン講座プラットフォーム。
受講者がコースを閲覧・視聴でき、管理者がコースを管理できる。
将来的に購入機能を追加予定。

## 技術スタック
- フロントエンド: Next.js 14 (App Router), TypeScript, Tailwind CSS
- バックエンド: Supabase（DB・認証・Storage）
- デプロイ: Vercel
- 認証: Supabase Auth（Google OAuth）

## 機能一覧

### 認証
- Googleアカウントでログイン・ログアウト
- ログインしていないユーザーはコース一覧まで閲覧可能
- 動画視聴にはログインが必要

### コース一覧ページ（/courses）
- コースのサムネイル・タイトル・説明・セクション数を表示
- カテゴリでフィルタリング

### コース詳細ページ（/courses/[id]）
- コース説明・講師情報・カリキュラム一覧を表示
- 各レクチャーのタイトル・時間を表示
- 受講開始ボタン

### 動画視聴ページ（/courses/[id]/learn）
- ダミー動画プレーヤー（後でYouTube埋め込み or Supabase Storageに変更予定）
- 左サイドバーにカリキュラム一覧
- レクチャーの完了チェック
- 次のレクチャーへの自動遷移

### 進捗管理
- 受講者ごとの視聴済みレクチャーを記録
- コース全体の進捗率をパーセントで表示

### 管理者ダッシュボード（/admin）
- 管理者ロールのユーザーのみアクセス可能
- コースのCRUD（作成・編集・削除）
- レクチャーのCRUD
- 受講者一覧・進捗確認

## 画面一覧
| パス | 説明 |
|------|------|
| `/` | トップページ（コース一覧へ誘導） |
| `/courses` | コース一覧 |
| `/courses/[id]` | コース詳細 |
| `/courses/[id]/learn` | 動画視聴・学習画面 |
| `/admin` | 管理者ダッシュボード |
| `/admin/courses/new` | コース作成 |
| `/admin/courses/[id]/edit` | コース編集 |

## DBテーブル設計（概要）

### users（Supabase Authと連携）
- id, email, name, avatar_url, role（student / admin）, created_at

### courses
- id, title, description, thumbnail_url, category, instructor_id, created_at

### sections
- id, course_id, title, order

### lectures
- id, section_id, title, video_url, duration, order

### enrollments
- id, user_id, course_id, enrolled_at

### progress
- id, user_id, lecture_id, completed_at

## 将来追加予定
- Stripe決済によるコース購入機能
- 動画をYouTube埋め込みまたはSupabase Storageに変更
- レビュー・評価機能
- 受講証明書の発行
