<template>
  <div class="container">
    <div class="card">
      <div class="card-content">
        <div class="field">
          <label for="userId" class="label">ユーザID</label>
          <div class="control">
            <input class="input" type="text" name="userId" id="userId" v-model="userId" />
          </div>
        </div>
        <div class="field">
          <label for="username" class="label">表示名</label>
          <div class="control">
            <input class="input" type="text" name="username" id="username" v-model="username" />
          </div>
        </div>
        <div class="field is-grouped is-grouped-right">
          <button class="button" style="margin-right: 10px" @click="backLoginPage">戻る</button>
          <button class="button is-primary" @click="onSubmit">登録</button>
        </div>
      </div>
      <div v-if="successMessage" class="notification is-success">
          {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="notification is-danger">
          <button class="delete" @click="closeNotice"></button>
          {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      userId: "",
      username: "",
      successMessage: false,
      errorMessage: false
    };
  },
  methods: {
    async onSubmit() {
        const result = await this.$store.dispatch("createUser", {
            userId: this.userId, 
            username: this.username
        });
        if (result) {
            this.successMessage = "ユーザの作成に成功しました! 3秒後にログイン画面に戻ります。";
            setTimeout(this.backLoginPage, 3000);
        } else {
            this.errorMessage = "ユーザの作成に失敗しました。"
        }
    },
    async backLoginPage() {
        this.$router.push("/login");
    },
    closeNotice() {
        this.successMessage = false;
        this.errorMessage = false;
    }
  }
};
</script>

<style scoped>
.card {
  width: 500px;
  height: auto;
}
</style>