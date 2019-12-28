
// 認証除外パス一覧(認証が不要なパス)
const excludePaths = ["/login", "/signUp"];

// 認証済みチェック処理
export default function ({ route, redirect, store }) {

    // リクエストされたパスを取得
    const currentPath = route.path;
    console.log(`request path is "${currentPath}."`);

    // ログイン不要なパスの場合は処理を終了させる
    if (excludePaths.includes(currentPath)) {
        console.log("unauthentication path.")
        return;
    }

    // ログイン済みか確認し、未ログインの場合はログイン画面へ飛ばす
    if (!store.getters["isLogined"]) {
        console.log("Forbidden. Redirect to login page.");
        redirect("/login");
    } else {
        console.log("authenticated.");
    }

}