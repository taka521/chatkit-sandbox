# chatkit-sandbox

Pusher Chatkitの検証用リポジトリ

## Pusher Chatkit

https://pusher.com/chatkit

チャット基盤を提供しているサービスで、

* 1 on 1のチャット
* グループチャット
* 画像などのメディア送受信
* チャットの履歴保存
* モバイル・WEBプッシュ通知
* オンライン・オフラインの確認

などチャットおよび、付加機能を多く提供している。


## 参考資料

* https://www.sitepoint.com/pusher-vue-real-time-chat-app/


## 環境構築

### Chatkitの登録

Chatkitに登録し、インスタンスを作成してください。

<img src="./img/001.png" width="50%">

<img src="./img/002.png" width="50%">

「Credentials」を開き、『Instance Locator』『Secret Key』『Your Test Token Provdider Endpoint』の値を控えておいてください。  
初期状態は『Your Test Token Provdider Endpoint』は存在しないので、「ENABLED?」にチェックをつけてください。  
<img src="./img/003.png" width="50%">


### 環境変数の設定

auth-server と chat-app プロジェクト配下で以下の環境変数を設定してください。  
`direnv`の利用を想定しています。

* auth-server

```
CHATKIT_INSTANCE_LOCATOR=[your instance locator]
CHATKIT_PRIVATE_KEY=[your instance private key]
CHATKIT_TEST_TOKEN_PROVIDER_ENDPOINT=[your instance test token provider endpoint]
```

* chat-app

```
CHATKIT_INSTANCE_LOCATOR=[your instance locator]
TOKEN_PROVIDER_URL=http:localhost:3001/token
```

