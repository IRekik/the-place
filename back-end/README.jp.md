# バックエンドフォルダのドキュメンテーション

このドキュメントは、Next.jsフレームワーク、React、およびTypeScript Expressを使用して開発された「The Place」ブログWebアプリケーションのバックエンドフォルダ構造、構成ファイル、および主要なコンポーネントの概要を提供します。

## フォルダ構造

バックエンドフォルダには以下の構造があります:

- `src`: バックエンドサーバーのソースコードを含みます。
  - `routes`: 異なるAPIエンドポイントのルートハンドラが含まれます。
  - `utils`: Cloudinary統合やデータベース接続などのユーティリティ関数と統合が含まれます。
- `test`: Jest用のテストファイルが格納されます。

## 構成ファイル

### `jest.config.js`

この構成ファイルは、Jestを使用したテストの実行に使用されます。主な構成にはテストランナー、テスト環境、ファイル拡張子、およびモジュール名のマッピングが含まれます。

### `package.json`

このファイルにはバックエンドプロジェクトに関するメタデータが含まれ、テスト、サーバーの起動、およびTypeScriptコードのビルドのためのスクリプトが記載されています。依存関係とdevDependenciesもここにリストされています。

### `tsconfig.json`

このTypeScript構成ファイルは、ターゲット、モジュール、出力ディレクトリ、ルートディレクトリ、および厳格モードを含むコンパイラオプションを定義します。また、コンパイルに含めるファイルも指定されています。

## 環境変数

アプリケーションの完全性とセキュリティを確保するために、秘密情報はシステム変数として保存されています。以下は設定する環境変数の一覧です:

- `CLOUD_NAME`: Cloudinaryのクラウド名。
- `CLOUDINARY_API_KEY`: CloudinaryのAPIキー。
- `CLOUDINARY_API_SECRET`: CloudinaryのAPIシークレット。
- `PG_USER`: PostgreSQL Pool接続のユーザーフィールド。
- `PG_HOST`: PostgreSQL Pool接続のホストフィールド。
- `PG_DATABASE`: PostgreSQL Pool接続のデータベースフィールド。
- `PG_PASSWORD`: PostgreSQL Pool接続のパスワードフィールド。
- `PG_PORT`: PostgreSQL Pool接続のポートフィールド。
- `SECRET_KEY`: JWTトークンを生成するためのJWT秘密鍵。
- `TOKEN`: `SECRET_KEY`を使用して生成されたJWTトークン。

## サーバーのエントリーポイント

### `src/index.ts`

このファイルはバックエンドサーバーのエントリーポイントとして機能します。Expressアプリケーションを構成し、ミドルウェア（CORSおよびJSONパーシングなど）をセットアップし、ルートを定義し、HTTPサーバーを作成します。サーバーは指定されたポートでリッスンします。

## ルートハンドラ

バックエンドではExpress.jsを使用してルーティングを行います。各ルートハンドラは特定のAPIエンドポイントに対応しています。各エンドポイントの詳細な概要は次のとおりです:

### ブログ投稿の削除

**エンドポイント:** `DELETE /delete-post/:postId`

提供された投稿IDを使用してデータベースからブログ投稿を削除します。

```javascript
const result = await pool.query('DELETE FROM blogs_table WHERE blog_id = $1', [postId]);
```

### ブログ投稿の編集

**エンドポイント:** `POST /edit-post/:postId`

提供された投稿IDを使用してブログ投稿のタイトルとテキストコンテンツを更新し、編集日時を記録します。

```javascript
const result = await pool.query('UPDATE blogs_table SET title = $2, content = $3, edit_date = $4 WHERE blog_id = $1', [postId, title, text_content, edit_date]);
```

### すべてのブログ投稿の取得

**エンドポイント:** `GET /get-all-posts`

データベースからすべてのブログ投稿を取得します。すべてのフィールドが含まれます。
```javascript
const result = await pool.query('SELECT * FROM blogs_table ORDER BY creation_date DESC');
```

### ヒーローセクションデータの取得

**エンドポイント:** `GET /get-hero-data`

ホームページのヒーローセクションに関連する情報を取得します。スレッド、コメント、およびユーザーの数がプレースホルダーとして提供されます。

```javascript
const result = await pool.query("SELECT count(*) AS exact_count FROM blogs_table");
```

### IDでブログ投稿の取得

**エンドポイント:** `GET /get-post-by-id/:postId`

提供された投稿IDに基づいてデータベースから特定のブログ投稿を取得します。

```javascript
const result = await pool.query('SELECT * FROM blogs_table WHERE blog_id = $1', [postId]);
```

### 新しいブログ投稿の投稿

**エンドポイント:** `POST /submit-data`

新しいブログ投稿をデータベースに挿入します。エンドポイントはテキストと画像の両方のコンテンツをサポートしています。

```javascript
if (img_reference) {
    const img_link = await uploadBase64Image(img_reference);
    query = 'INSERT INTO blogs_table (title, content, creation_date, img_reference) VALUES ($1, $2, $3, $4) RETURNING *';
    params = [title, text_content, creation_date, img_link];
} else {
    query = 'INSERT INTO blogs_table (title, content, creation_date) VALUES ($1, $2, $3) RETURNING *';
    params = [title, text_content, creation_date];
}
```

## データベース統合

### `src/utils/db.ts`

このファイルは、`pg`ライブラリを使用してPostgreSQLデータベースに接続します。`Pool`オブジェクトは接続を管理するために使用されます。ユーザー、ホスト、データベース名、パスワード、およびポートなどのデータベースの構成詳細は環境変数から取得されます。

## Cloudinary統合

### `src/utils/cloudinaryIntegration.ts`

このファイルは、画像ホスティングのためのCloudinaryサービスとの統合を提供します。`cloudinary`ライブラリを使用してCloudinary APIを環境変数から取得した資格情報で構成します。`uploadBase64Image`関数はbase64エンコードされた画像のアップロードを処理し、参照リンクを返します。

## テスト

`test`ディレクトリにはJestを使用してバックエンドコードをテストするためのファイルが含まれています。テストファイルは `*.test.ts`. のような命名規則に従います。`npm test`を実行するとJestが実行され、テストスイートが実行されます。

## サーバーの実行

バックエンドサーバーを起動するには、次のnpmスクリプトを使用します:

```bash
npm start
```

このスクリプトはTypeScriptサポートのために`ts-node`を使用してサーバーを実行します。

## もっと詳しく

- **Express.js Documentation**: 公式の[Express.js　のドキュメンテーション](https://expressjs.com/)を探索して、Expressを使用したウェブアプリケーションの構築に関する詳細な情報を得てください。

- **Jest Documentation**: 公式の[Jest のドキュメンテーション](https://jestjs.io/)を参照して、JavaScriptおよびTypeScriptコードのテストに関する包括的なガイドを得てください。

- **Cloudinary Documentation**: ウェブおよびモバイルアプリケーションでの効果的な画像およびビデオの管理に提供されるCloudinaryの機能と統合を見つけるには、[Cloudinary のドキュメンテーション](https://cloudinary.com/documentation)を探索してください。