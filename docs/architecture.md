# UdemyClone 設計図・構成図

## 1. システム全体像

```
ユーザーのブラウザ
　↓ アクセス
Vercel（Next.js アプリ）
　↓ データの読み書き
Supabase（データベース・認証）
　↓ ログイン連携
Google OAuth
```

---

## 2. 使用技術

| 技術 | 役割 |
|------|------|
| Next.js 16 | フロントエンド・サーバー |
| TypeScript | 型安全なコード |
| Tailwind CSS | デザイン・スタイル |
| Supabase | データベース・認証 |
| Google OAuth | Googleログイン |
| Vercel | デプロイ・公開 |

---

## 3. フォルダ構成

```
udemy-clone/
├── src/
│   ├── app/                          # ページ（URLに対応）
│   │   ├── page.tsx                  # トップページ (/)
│   │   ├── layout.tsx                # 全ページ共通レイアウト
│   │   ├── globals.css               # 全体のスタイル
│   │   ├── favicon.ico               # ブラウザタブのアイコン
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx              # ログインページ (/login)
│   │   │
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts          # Googleログイン後のリダイレクト処理
│   │   │
│   │   ├── courses/                  # コース関連ページ
│   │   │   ├── page.tsx              # コース一覧 (/courses)
│   │   │   ├── loading.tsx           # 読み込み中の表示
│   │   │   └── [id]/                 # 各コースページ（idは動的）
│   │   │       ├── page.tsx          # コース詳細 (/courses/123)
│   │   │       ├── loading.tsx       # 読み込み中の表示
│   │   │       └── learn/
│   │   │           ├── page.tsx      # 受講ページ (/courses/123/learn)
│   │   │           └── actions.ts    # 進捗保存などのサーバー処理
│   │   │
│   │   └── admin/                    # 管理者ページ（adminのみアクセス可）
│   │       ├── page.tsx              # 管理者TOP (/admin)
│   │       ├── layout.tsx            # 管理者共通レイアウト（サイドバー）
│   │       ├── loading.tsx           # 読み込み中の表示
│   │       ├── courses/
│   │       │   ├── page.tsx          # コース管理一覧 (/admin/courses)
│   │       │   ├── actions.ts        # コースのCRUD処理
│   │       │   ├── new/
│   │       │   │   └── page.tsx      # コース新規作成 (/admin/courses/new)
│   │       │   └── [id]/
│   │       │       ├── edit/
│   │       │       │   └── page.tsx  # コース編集 (/admin/courses/123/edit)
│   │       │       └── lectures/
│   │       │           ├── page.tsx  # レクチャー管理 (/admin/courses/123/lectures)
│   │       │           └── actions.ts # レクチャーのCRUD処理
│   │       └── students/
│   │           └── page.tsx          # 受講者一覧 (/admin/students)
│   │
│   ├── components/                   # 画面部品（使い回し可能）
│   │   ├── Header.tsx                # ヘッダー（全ページ共通）
│   │   ├── admin/                    # 管理者ページ専用部品
│   │   │   ├── CourseForm.tsx        # コース作成・編集フォーム
│   │   │   ├── DeleteCourseButton.tsx    # コース削除ボタン
│   │   │   ├── DeleteLectureButton.tsx   # レクチャー削除ボタン
│   │   │   └── DeleteSectionButton.tsx   # セクション削除ボタン
│   │   └── learn/                    # 受講ページ専用部品
│   │       ├── CurriculumSidebar.tsx # カリキュラム一覧サイドバー
│   │       ├── LearnClient.tsx       # 受講ページのメイン部品
│   │       └── VideoPlayer.tsx       # 動画プレイヤー
│   │
│   ├── hooks/                        # Reactフック（共通処理）
│   │   └── useUserRole.ts            # ユーザーのrole取得
│   │
│   ├── lib/                          # ヘルパー関数
│   │   ├── supabase.ts               # Supabase接続（ブラウザ用）
│   │   └── supabase-server.ts        # Supabase接続（サーバー用）
│   │
│   ├── middleware.ts                 # /adminページの保護
│   │
│   └── types/                        # TypeScript型定義
│       ├── user.ts                   # ユーザーの型
│       └── course.ts                 # コース・セクション・レクチャーの型
│
├── docs/                             # ドキュメント
├── supabase/                         # DB設定
└── .env.local                        # 環境変数（秘密情報）※GitHubに上げない
```

---

## 4. URLとページの対応

| URL | ページ | 誰がアクセスできるか |
|-----|--------|------------------|
| / | トップページ | 全員 |
| /login | ログインページ | 全員 |
| /courses | コース一覧 | 全員 |
| /courses/123 | コース詳細 | 全員 |
| /courses/123/learn | 受講ページ | ログイン済みのみ |
| /admin | 管理者TOP | adminのみ |
| /admin/courses | コース管理 | adminのみ |
| /admin/courses/new | コース新規作成 | adminのみ |
| /admin/courses/123/edit | コース編集 | adminのみ |
| /admin/courses/123/lectures | レクチャー管理 | adminのみ |
| /admin/students | 受講者一覧 | adminのみ |

---

## 5. データベース構成（Supabase）

```
public.users（ユーザー）
├── id          : ユーザーID
├── name        : 名前
├── email       : メールアドレス
├── avatar_url  : プロフィール画像URL
├── role        : student / admin
└── created_at  : 作成日時

public.courses（コース）
├── id           : コースID
├── title        : タイトル
├── description  : 説明
├── category     : カテゴリ
├── thumbnail_url: サムネイル画像
├── instructor_id: 講師のユーザーID
└── created_at   : 作成日時

public.sections（セクション）
├── id        : セクションID
├── course_id : どのコースか
├── title     : タイトル
└── order     : 順番

public.lectures（レクチャー）
├── id         : レクチャーID
├── section_id : どのセクションか
├── title      : タイトル
├── video_url  : 動画URL
└── order      : 順番

public.enrollments（受講登録）
├── id        : 登録ID
├── user_id   : ユーザーID
└── course_id : コースID

public.progress（進捗）
├── id         : 進捗ID
├── user_id    : ユーザーID
├── lecture_id : レクチャーID
└── completed  : 完了フラグ
```

---

## 6. 認証・ロール管理の流れ

```
1. ユーザーが「Googleでログイン」ボタンを押す
2. Google認証画面が開く
3. 認証成功 → auth.usersに自動登録
4. DBトリガー発動 → public.usersに自動登録（role=student）
5. adminにしたい場合はSupabaseのSQL Editorで手動変更
   UPDATE public.users SET role = 'admin' WHERE email = 'メールアドレス';
```

### roleによる制限

| role | できること |
|------|-----------|
| 未ログイン | コース一覧・詳細の閲覧のみ |
| student | ログイン・受講・進捗管理 |
| admin | 上記すべて＋管理者ダッシュボード |

---

## 7. セキュリティ

| 対策 | 内容 |
|------|------|
| HTTPS | Vercelが自動対応 |
| RLS | Supabaseのテーブルごとにアクセス制限 |
| middleware.ts | /adminページはadminのみアクセス可 |
| .env.local | 秘密情報はGitHubに上げない |

---

## 8. 環境変数一覧（.env.local）

```
NEXT_PUBLIC_SUPABASE_URL      # SupabaseのURL
NEXT_PUBLIC_SUPABASE_ANON_KEY # Supabaseの公開キー
SUPABASE_SECRET_KEY           # Supabaseの秘密キー
GOOGLE_CLIENT_ID              # GoogleのクライアントID
GOOGLE_CLIENT_SECRET          # Googleのクライアントシークレット
```

※ Vercelにも同じ環境変数を設定すること！

---

## 9. デプロイ構成

```
開発環境（ローカル）
→ http://localhost:3000
→ VSCodeで編集・確認

本番環境（Vercel）
→ https://udemy-clone-dun.vercel.app
→ GitHubのmainブランチにプッシュすると自動デプロイ
```

---

## 10. 機能追加・修正の手順

### 新しいページを追加したい場合
1. `src/app/` 配下に新しいフォルダと `page.tsx` を作成
2. Claude Codeに「〇〇ページを追加してください」と指示

### デザインを変更したい場合
1. 該当のファイルをVSCodeで開く
2. Claude Codeに「〇〇のデザインを変更してください」と指示
3. Tailwind CSSのクラス名が変更される

### DBにカラムを追加したい場合
1. SupabaseのSQL Editorで `ALTER TABLE` を実行
2. `src/types/` の型定義を更新
3. Claude Codeに「〇〇テーブルに△△カラムを追加しました。対応してください」と指示
