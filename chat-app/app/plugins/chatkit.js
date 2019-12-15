import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

const instanceLocator = process.env.instanceLocator;
const tokenUrl = process.env.tokenProviderUrl;

let chatManager = null;
let currentUser = null;

/**
 * 指定されたユーザIDを基に、Chatkitサーバへ接続を行います。
 * 
 * @param {string} userId ユーザID
 * @returns 接続済みユーザのオブジェクト
 */
async function connectUser(userId) {

  console.log("instanceLocator : ", instanceLocator);
  console.log("tokenUrl : ", tokenUrl);

  // chatManagerを初期化(これいいのか？)
  if (!chatManager) {
    chatManager = new ChatManager({
      instanceLocator: instanceLocator,
      userId: userId,
      tokenProvider: new TokenProvider({
        url: tokenUrl,
        headers: {
          "X-USER-ID": userId
        }
      }),
      connectionTimeout: 10 * 1000
    });
  }
  console.log("chatManager : ", chatManager);

  // connectはPromiseを返却するためawaitする
  currentUser = await chatManager.connect();
  return currentUser;
}

export default {
  connectUser
}