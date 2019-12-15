const express = require('express')
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const Chatkit = require("@pusher/chatkit-server")

const app = express()

// =======================================
// settings
// =======================================

// body parser settings
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// chatkit
const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_PRIVATE_KEY
});


// =======================================
// routes
// =======================================

app.all("/", async (req, res) => {
  res.send('うぇるかむ　おーすさーばー')
})

/*
  == ログインAPI ==

  クライアントから提出されたID・PWを検証し、問題なければ200を返却する。

  今回は認証処理の実装が面倒なので、
  指定されたIDのユーザがChatkitにユーザが存在すればOKにしている。
*/
app.post("/login", async (req, res) => {
  console.log(`=== start ${req.path} ===`);
  console.log("request header : ", req.headers)
  console.log("request body : ", req.body);

  // ごみのようなバリデーションチェック
  const { id, pw } = req.body;
  try {
    validator().notEmpty("id", id).notEmpty("パスワード", pw);
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message).end();
    return;
  }

  // Chatkit にユーザが存在するか問い合わせ
  chatkit.getUser({
    id: id
  }).then(() => {
    console.log("login success.")
    res.status(200).send("OK");
  }).catch((err) => {
    console.log(err);
    res.status(400).send("user not found");
  }).finally(() => {
    console.log(`=== end ${req.path} ===`);
  });
});


/*
  == ユーザ作成API ==

  クライアントから指定されたID・ユーザ名をもとに、Chatkitにユーザ作成リクエストを行います。

  Chatkitのユーザはダッシュボードから作成するか、サーバサイドSDKを用いてユーザ作成を行うしかない。
  そのため、自サービス側のユーザ作成時に、Chatkitのユーザも併せて作成するとよい。
  ・https://pusher.com/docs/chatkit/reference/server-node#users
*/
app.put("/user", async (req, res) => {
  console.log(`=== start ${req.path} ===`);
  console.log("request header : ", req.headers)
  console.log("request body : ", req.body);

  // ごみのようなバリデーションチェック
  const { id, name } = req.body;
  try {
    validator().notEmpty("id", id).notEmpty("name", name);
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message).end();
    return;
  }

  // Chatkit にユーザ作成リクエスト
  chatkit.createUser({
    id: id,
    name: name
  }).then((user) => {
    console.log("created user.", user);
    res.status(200).send("Created").end();
  }).catch((err) => {
    console.log(err);
    res.status(err.status).end();
  }).finally(() => {
    console.log(`=== end ${req.path} ===`);
  });

});


/*
  == Chatkit用トークンエンドポイントAPI ==

  想定としてはクライアントはリクエストヘッダ(Authorization)に自サービスで発行されたトークン（JWT等）を提出。
  提出されたトークンに問題がなければChatkitに問い合わせを行い、Chatkit用のトークンを返却します。

  今回はJWTではなく、X-USER-IDヘッダからユーザIDを取得する。

  レスポンスは、Chatkitが要求するレスポンス形式に合わせる。
  ・https://pusher.com/docs/chatkit/reference/javascript#tokenprovider-arguments

  {
    "access_token": "<your token here>",
    "expires_in": "<seconds until token expiry here>"
  }

*/
app.post("/token", async (req, res) => {
  console.log(`=== start ${req.path} ===`);
  console.log("request header : ", req.headers);
  console.log("request query :", req.query);
  console.log("request body : ", req.body);

  // 提出された自サービスのトークンを検証（するつもり）
  // const token = req.header("Authorization")

  // Chatkitの認証
  const authData = chatkit.authenticate({
    userId: req.headers['x-user-id']
  });
  console.log("authData : ", authData);

  const { access_token, expires_in } = authData.body;

  console.log("access_token : ", jwt.decode(access_token));

  res.status(authData.status)
    .send(authData.body)
    .end();

  console.log(`=== end ${req.path} ===`);
});

// =======================================
// start server
// =======================================
app.listen(80)
console.log("started auth server http://localhost:80 .")


// =======================================
// ユーティリティ
// =======================================
const validator = () => ({
  notEmpty: function (name, value) {
    if (!value || value === '') throw Error(`${name}が指定されていません`);
    return this;
  }
});