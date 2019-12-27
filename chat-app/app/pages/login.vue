<template>
  <div class="container">
    <div class="card">
      <div class="card-content">
        <div class="field">
          <label for="name" class="label">UserID</label>
          <div class="control">
            <input class="input" type="text" name="userId" id="userId" v-model="userId" />
          </div>
        </div>
        <div class="field">
          <label for="password" class="label">Password</label>
          <div class="control">
            <input class="input" type="password" name="password" id="password" v-model="password" />
          </div>
        </div>
        <div class="field is-grouped is-grouped-right">
          <button class="button mr10" @click="onSignUp">新規登録</button>
          <button class="button is-primary" @click="onSubmit">ログイン</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      userId: "",
      password: ""
    };
  },
  methods: {
    async onSubmit() {
      const result = await this.$store.dispatch("login", {
        userId: this.userId,
        password: this.password
      });
      if (result) {
        this.$router.push("/");
      }
    },
    async onSignUp() {
      this.$router.push("/signUp")
    }
  }
};
</script>

<style scoped>
.card {
  width: 500px;
  height: auto;
}
.mr10 {
  margin-right: 10px;
}
</style>