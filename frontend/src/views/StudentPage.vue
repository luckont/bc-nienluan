<template>
  <div class="row p-3">
    <div class="col-4 border border-end rounded">
      <h4 class="p-2">Thông tin cá nhân</h4>
      <div class="p-2">
        <img
          class="mb-2"
          src="https://elearning.ctu.edu.vn/theme/image.php/lambda/core/1675223774/u/f1"
          alt="avatar"
        />
        <p>Họ tên sinh viên: <strong>{{ users.name }}</strong></p>
        <p>Mã số sinh viên: <strong>{{ users.mssv }}</strong></p>
        <p>Email: <strong>{{ users.email }}</strong></p>
      </div>
    </div>
    <div class="col-8 rounded">
      <h4 class="p-2">Thông tin đăng ký báo cáo</h4>
      <div class="p-2" v-if="students.mssv">
        <p><strong>Thời gian báo cáo: {{ gio }} {{ ngay }}/2023</strong></p>
        <p>Phòng báo cáo: <strong>{{ phong }}</strong></p>
        <p>Tên đề tài tiếng việt: <strong>{{ students.nameProjectVi }}</strong></p>
        <p>Tên đề tài tiếng Anh: <strong>{{ students.nameProjectEn }}</strong></p>
        <p>Giảng viên hướng dẫn: <strong>{{ students.GVHD }}</strong></p>
        <p>Thời gian đăng ký: <strong>{{ students.timeCreate }}</strong></p>
        <strong
          >Lưu ý: Thí sinh phải có mặt trước 15p trước giờ báo cáo tại hội đồng
          báo cáo !</strong
        >
        <div class="row mt-4">
          <button class="btn btn-primary col mr-2" @click="editStudent()">
            Chỉnh sửa thông tin
          </button>
          <button class="btn btn-danger col ml-2" @click="deleteStudent()">
            Hủy đăng ký
          </button>
        </div>
      </div>
      <div class="p-2" v-else>
        <p>Bạn chưa đăng ký báo cáo</p>
        <button class="btn btn-primary mt-4" @click="addStudent()">
          Đăng ký báo cáo
        </button>
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
      students: [],
      ngay: '',
      gio: '',
    };
  },
  mounted() {
    this.getUsers();
    this.getStudents();
    this.ngay = localStorage.getItem("ngay");
    this.gio = localStorage.getItem("gio");
    this.phong = localStorage.getItem("phong");
  },
  methods: {
    async getUsers() {
      try {
        const idUser = localStorage.getItem("id");
        const res = await axios.get(`api/users/${idUser}`);
        this.users = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getStudents() {
      try {
        const idUser = localStorage.getItem("id");
        const res = await axios.get(`api/users/${idUser}`);
        this.users = res.data;
        const mssv = this.users.mssv;
        const resStudents = await axios.get(`api/students/?mssv=${mssv}`);
        if (resStudents.data.length != 0) {
          this.students = resStudents.data[0];
          localStorage.setItem("idDK", resStudents.data[0]._id);
        } else {
          console.log("khong co");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteStudent() {
      try {
        const idDK = localStorage.getItem("idDK");
        if (window.confirm("Bạn có chắc muốn hủy đăng ký !")) {
          const res = await axios.delete(`api/students/${idDK}`);
          alert("Bạn đã hủy thành công !");
          window.location.reload();
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    editStudent() {
      const idDK = localStorage.getItem("idDK");
      this.$router.push(`/students/${idDK}`);
    },
    addStudent() {
      this.$router.push("/students/add");
    },
  },
};
</script>
