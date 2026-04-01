# タスク一覧

## 進行中
（なし）

## 未着手

### フェーズ2: DB・認証
- [×] SupabaseでDBテーブル作成（users, courses, sections, lectures, enrollments, progress）
- [ ] Google OAuth設定（Supabase Auth）
- [x] ログイン・ログアウト実装
- [ ] ユーザーのrole管理（student / admin）

### フェーズ3: コース閲覧
- [ ] トップページ作成
- [ ] コース一覧ページ（/courses）
- [ ] コース詳細ページ（/courses/[id]）

### フェーズ4: 動画視聴・進捗管理
- [ ] 学習画面（/courses/[id]/learn）
- [ ] ダミー動画プレーヤー
- [ ] カリキュラムサイドバー
- [ ] レクチャー完了チェック
- [ ] 進捗率の計算・表示

### フェーズ5: 管理者ダッシュボード
- [ ] 管理者ルートの保護（adminロールのみ）
- [ ] コース一覧・作成・編集・削除
- [ ] レクチャー管理
- [ ] 受講者一覧・進捗確認

### フェーズ6: UI仕上げ・デプロイ
- [ ] UIをUdemyライクに整える
- [ ] レスポンシブ対応
- [ ] パフォーマンス改善
- [ ] セキュリティ確認
- [ ] GitHubにプッシュ
- [ ] Vercelにデプロイ

## 完了

### フェーズ1: 環境構築
- [x] Next.jsプロジェクト作成（TypeScript, Tailwind CSS）
- [x] Supabaseプロジェクト作成・接続設定
- [x] CLAUDE.mdの作成
- [x] .env.localの設定