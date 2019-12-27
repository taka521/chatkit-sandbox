import chatkit from "@/plugins/chatkit"

/** State */
export const state = () => ({
  /** ログイン状態 */
  isLogined: false,

  /** Charkitユーザ */
  user: null,
  /** 部屋一覧 */
  rooms: [],
  /** 現在の部屋 */
  activeRoom: null,
  /** 現在の部屋のユーザ一覧(自身は除く) */
  users: [],
  /** 現在の部屋のメッセージ一覧 */
  messages: []
})

/** Getters */
export const getters = {}

/** Mutations */
export const mutations = {
  ["SET_IS_LOGINED"](state, isLogined) { state.isLogined = isLogined; },

  ["SET_USER"](state, user) { state.user = user; },

  ["SET_ROOMS"](state, rooms) { state.rooms = rooms; },

  ["SET_ACTIVE_ROOM"](state, room) { state.activeRoom = room; },

  ["SET_USERS"](state, users) { state.users = users; },

  ["SET_MESSAGES"](state, messages) { state.messages = messages; },
  ["ADD_MESSAGE"](state, message) { state.messages.push(message); },

  ["CLEAR_CHAT_ROOM"](state) {
    state.users = [];
    state.messages = [];
  },

  ["RESET"](state) {
    state.user = null;
    state.rooms = [];
    state.activeRoom = null;
    state.users = [];
    state.messages = [];
  }
}

/** Actions */
export const actions = {

  /**
   * ログインアクション
   * 
   * チャットサービスへのログインおよび、Chatkitサーバへのログインを行います。
   * チャットサービスへは認証サーバへのログイン要求を行い、
   * 問題なければChatkitサーバへのログインを行います。
   * 上記2サービスへのログインが完了した場合、ログインアクションも完了とみなします。
   * 
   * @param {any} nuxtContext Nuxtコンテキスト
   * @param {any} loginInfo ログイン情報 
   * @returns true:ログイン完了 / false:ログイン失敗
   */
  async login({ commit }, { userId, password }) {

    ////////////////////////////////////////
    // サービスへのログイン & Chatkitへの接続
    ///////////////////////////////////////

    // ログイン済みの場合にしか認証サーバへアクセスできない想定なので、並列ではなくシーケンシャルに処理を行う。
    // ※あくまでも今回の "想定" なので、ケースバイケース。
    let currentUser = null;
    try {

      // auth-server
      await this.$axios.$post("/auth/login", { id: userId, pw: password })
        .then(res => console.log("Login successful on authentication server."));

      // chatkit
      currentUser = await chatkit.connectUser(userId);
      console.log("Login successful on Charkit");
      console.log("currentUser : ", currentUser);

    } catch (e) {
      console.error("ログイン処理でエラーが発生", e);
      return false;
    }

    ////////////////////////////////////
    // ログインが完了したら、stateを更新
    ///////////////////////////////////

    commit("SET_IS_LOGINED", true);
    commit("SET_USER", {
      username: currentUser.id,
      name: currentUser.name
    });

    // 部屋一覧
    const rooms = currentUser.rooms.map(room => ({
      id: room.id,
      name: room.name
    }));
    commit("SET_ROOMS", rooms);

    return true;
  },

  /**
   * ユーザ作成処理
   * 
   * @param {any} nuxtContext Nuxtコンテキスト
   * @param {any} UserInfo ユーザ情報
   */
  async createUser({ commit }, { userId, username }) {
    try {
      // ユーザ作成
      await this.$axios.$put("/auth/user/", { id: userId, name: username })
        .then(res => console.log(`crate user. id = ${userId}, name = ${username}`));
      return true;
    } catch (e) {
      console.warn("ユーザ作成処理でエラーが発生.", e);
      return false;
    }
  }
}