<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header"><h1>Đăng nhập</h1></div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="username"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                />
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/api/login", {
          username: this.username,
          password: this.password,
          mssv: this.mssv,
        });
        console.log(response.data)
        // localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("mssv", response.data.mssv);

        // this.$store.dispatch('setUser', username)
        this.$router.push("/home");
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
};
</script>

<style>
.card {
  width: 100%;
}

.btn-primary {
  width: 100%;
}

</style>
