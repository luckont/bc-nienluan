<template>
  <div class="pageAdmin p-4 row">
    <div class="m-auto row">
      <h3 class="pr-2">
        <router-link to="/adminB1910100">Quản lý người dùng</router-link>
      </h3>
      <h3>/</h3>
      <h3 class="pl-2">
        <router-link to="/adminB1910100/hoidong">Quản lý hôi đồng</router-link>
      </h3>
    </div>

    <div class="row mt-4">
      <div class="listUsers col">
        <h5>Danh sách người dùng</h5>

        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>MSSV</th>
              <th>Email</th>
              <th>Cập nhật</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
              <td>{{ index + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.mssv }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button class="btn" @click="updateUser(user._id)">
                  <i
                    class="fa-regular fa-pen-to-square"
                    style="color: #527dff"
                  ></i>
                </button>
              </td>
              <td>
                <button class="btn" @click="deleteUser(user._id)">
                  <i
                    class="fa-sharp fa-regular fa-circle-xmark"
                    style="color: #ff0000"
                  ></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="!isUpdateUser" class="add col">
        <h5>Thêm người dùng</h5>
        <input v-model="usernameAdd" placeholder="MSSV" />
        <input v-model="nameAdd" placeholder="Tên người dùng" />
        <input v-model="emailAdd" placeholder="Email" />
        <input v-model="passwordAdd" placeholder="Mật khẩu" />
        <button class="btn btn-primary" @click="addUser()">
          Thêm người dùng
        </button>
      </div>

      <div v-if="isUpdateUser" class="update col">
        <h5>Cập nhật người dùng</h5>
        <div class="c">
          <small class="pl-2">Mã số sinh viên: </small>
          <input v-model="userUp.username" />
          <small class="pl-2">Tên sinh viên: </small>
          <input v-model="userUp.name" />
          <small class="pl-2">Email: </small>
          <input v-model="userUp.email" />
          <small class="pl-2">Mật khẩu:</small>
          <input v-model="userUp.password" />
          <button class="btn btn-success w-100" @click="getUpdate()">
            Cập nhật
          </button>
          <button class="btn btn-primary mt-2" @click="isUpdateUser = false">
            Thêm người dùng
          </button>
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
      users: [],
      userUp: [],
      usernameAdd: "",
      nameAdd: "",
      passwordAdd: "",
      emailAdd: "",
      isUpdateUser: false,
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        this.users = res.data;
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async addUser() {
      try {
        const res = await axios.post("http://localhost:5000/api/users", {
          username: this.usernameAdd,
          password: this.passwordAdd,
          mssv: this.usernameAdd,
          email: this.emailAdd,
          name: this.nameAdd,
        });
        if ((res.status = 200)) {
          alert("Người dùng đã được thêm thành công !");
          window.location.reload();
        }
      } catch (error) {
        // console.log(error)
        alert("Thông tin người dùng chưa đúng");
      }
    },
    async updateUser(_id) {
      try {
        this.isUpdateUser = true;
        const res = await axios.get(`http://localhost:5000/api/users/${_id}`);
        this.userUp = res.data;
        const id = this.userUp._id;
        console.log(this.userUp);
      } catch (error) {
        console.log(error);
      }
    },
    async getUpdate() {
      try {
        const id = this.userUp._id;
        const resUp = await axios.put(`http://localhost:5000/api/users/${id}`, {
          username: this.userUp.username,
          password: this.userUp.password,
          mssv: this.userUp.username,
          email: this.userUp.email,
          name: this.userUp.name,
        });
        alert("Cập nhật thông tin thành công !");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(_id) {
      if (window.confirm("Bạn có chắc muốn xóa người này !")) {
        const res = await axios.delete(
          `http://localhost:5000/api/users/${_id}`
        );
        alert("Người dùng này đã bị xóa");
        window.location.reload();
      } else {
        alert("Đã hủy");
      }
    },
  },
};
</script>
<style scoped>
input {
  margin: 8px 0;
  width: 100%;
}
</style>
