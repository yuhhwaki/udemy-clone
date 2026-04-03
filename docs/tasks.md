# タスク一覧

## 進行中
（なし）

## 未着手

### フェーズ2: DB・認証
- [×] SupabaseでDBテーブル作成（users, courses, sections, lectures, enrollments, progress）
- [x] Google OAuth設定（Supabase Auth）
- [x] ログイン・ログアウト実装
- [x] ユーザーのrole管理（student / admin）

### フェーズ3: コース閲覧
- [x] トップページ作成
- [x] コース一覧ページ（/courses）
- [x] コース詳細ページ（/courses/[id]）

### フェーズ4: 動画視聴・進捗管理
- [x] 学習画面（/courses/[id]/learn）
- [x] ダミー動画プレーヤー
- [x] カリキュラムサイドバー
- [x] レクチャー完了チェック
- [x] 進捗率の計算・表示

### フェーズ5: 管理者ダッシュボード
- [x] 管理者ルートの保護（adminロールのみ）
- [x] コース一覧・作成・編集・削除
- [x] レクチャー管理
- [x] 受講者一覧・進捗確認

### フェーズ6: UI仕上げ・デプロイ
- [x] UIをUdemyライクに整える
- [x] レスポンシブ対応
- [x] パフォーマンス改善
- [x] セキュリティ確認
- [ ] GitHubにプッシュ
- [ ] Vercelにデプロイ

## 完了

### フェーズ1: 環境構築
- [x] Next.jsプロジェクト作成（TypeScript, Tailwind CSS）
- [x] Supabaseプロジェクト作成・接続設定
- [x] CLAUDE.mdの作成
- [x] .env.localの設定