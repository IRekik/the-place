# The Place - フロントエンド

"The Place"ブログWebアプリケーションのフロントエンドは、Next.jsフレームワーク、Reactを使用してUIコンポーネントを開発し、より堅牢な開発体験のためにTypeScriptを使用しています。このセクションでは、プロジェクト構造、主要なコンポーネント、およびフロントエンドをローカルでセットアップして実行する方法について概説します。

## プロジェクト構造

- `components/`: プロジェクト全体で使用されるReactコンポーネントが含まれています。
  - `blogs/`: ブログ投稿に関連するコンポーネント。
    - `BlogPostDisplay.tsx`: 個々のブログ投稿を表示するためのReactコンポーネント。
    - `Ellipsis.tsx`: 編集や削除などのオプションを持つ省略メニューのReactコンポーネント。
  - `home/`: ホームページに関連するコンポーネント。
    - `BlogPost.tsx`: ホームページにおけるブログ投稿の表示のためのReactコンポーネント。
    - `Footer.tsx`: ホームページのフッターセクションのためのReactコンポーネント。
    - `Hero.tsx`: ホームページのヒーローセクションのためのReactコンポーネント。
- `utils/`: ユーティリティ関数とインターフェースが含まれています。
  - `interfaces/`: データ構造を定義するためのTypeScriptインターフェース。
    - `blogPostInterface.ts`: ブログ投稿データ構造のインターフェース。
    - `heroDataInterface.ts`: ヒーローデータ構造のインターフェース。
  - `formatDate.ts`: 日付をフォーマットするためのユーティリティ関数。
  - `environmentVariables/`: 定数や環境変数が含まれています。
    - `serverUrl.ts`: サーバーのURLが記載されたファイル。
- `app/`: Next.jsのページが含まれています。
  - `new-post/page.tsx`: 新しいブログ投稿を作成するためのページ。
  - `posts/[blog_id]/page.tsx`: 個々のブログ投稿を表示するためのページ。
  - `index.tsx`: ルート間で共有されるUIのレイアウト。
  - `page.tsx`: ホームページ。

## 環境変数

アプリケーションの完全性とセキュリティを確保するために、秘密情報はシステム変数として保存されています。以下は設定する環境変数の一覧です:

- `SECRET_KEY`: JWTトークンを生成するために使用されるJWT秘密鍵。
- `TOKEN`: `SECRET_KEY`を使用して生成されたJWTトークン。

### App

- **`new-post`**: 新しいブログ投稿を作成するためのページが含まれています。
- **`posts`**: 個々のブログ投稿用の動的なページが含まれています。
- **`layout.tsx`**: アプリケーション全体のレイアウトを定義します。
- **`page.tsx`**: メインのページコンポーネントで、HeroやBlogPostsなどさまざまなセクションを統合します。

### Components

- **`blogs`**: ブログ投稿の表示に関連するコンポーネントが格納されています。
- **`home`**: ホームページに関連するコンポーネントが格納されています。
- **`new-post`**: 新しい投稿の作成に関連するコンポーネントが格納されています。

### Utils

- **`environmentVariables`**: サーバーのURLなどの構成変数が格納されています。
- **`interfaces`**: アプリケーションで使用されるデータ構造のためのTypeScriptインターフェースを定義します。
- **`contentBoxParser.js`**: 画像の参照やテキストコンテンツの解析を行うためのファイル。
- **`formatDate.js`**: 日付文字列をフォーマットするためのファイル。

## ローカルで実行する

### インストール

1. リポジトリをクローンします:

    ```bash
    git clone https://github.com/IRekik/the-place.git
    ```

2. フロントエンドディレクトリに移動します:

    ```bash
    cd the-place/front-end
    ```

3. 依存関係をインストールします:

    ```bash
    npm install
    ```
4. プロジェクトをビルドします:

    ```bash
    npm run build
    ```

### 開発サーバーの起動

以下のコマンドを実行して開発サーバーを起動します:

```bash
npm run dev
```

ブラウザで`http://localhost:3000` を開いてアプリケーションを表示します。

## テスト

`test`ディレクトリにはJestを使用してバックエンドコードをテストするためのファイルが含まれています。

### 必要条件

[Node.js](https://nodejs.org/)がインストールされていることを確認してください。

### テストの実行

次のコマンドを実行してテストを実行します:

```bash
npm install
npm test
```

## もっと詳しく

使用されている技術の公式ドキュメンテーションを探索してください:

- [Next.js のドキュメンテーション](https://nextjs.org/docs) - Next.jsの機能とAPIについて学びます。
- [を学 Next.js](https://nextjs.org/learn) - インタラクティブなNext.jsのチュートリアルです。

[Next.js GitHub のドキュメンテーション](https://github.com/vercel/next.js/) もチェックしてみてください、フィードバックや貢献は歓迎されています！

## Deploy on Vercel

Next.jsアプリをデプロイする最も簡単な方法は、Next.jsの作者による[Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)を使用することです。

詳細については、[Next.js deployment のドキュメンテーション](https://nextjs.org/docs/deployment)を確認してください。
