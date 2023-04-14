<template>
  <div class="page">
    <StudentForm :student="student" @submit="handleSubmit" />
  </div>
</template>

<script>
import StudentForm from "@/components/StudentForm.vue";
import axios from "axios";
export default {
  components: {
    StudentForm,
  },
  data() {
    return {
      student: [],
      users: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const idUser = localStorage.getItem("id");
        const res = await axios.get(`http://127.0.0.1:3001/api/users/${idUser}`);
        this.users = res.data;
        console.log(this.users)
      } catch (error) {
        console.log(error);
      }
    },
    async handleSubmit() {
      try {
        const res = await axios.post("/api/students/", {
          email: this.users.email,
          name: this.users.name,
          MSSV: this.users.mssv,
          GVHD: this.student.GVHD,
          nameProjectVi: this.student.nameProjectVi,
          nameProjectEn: this.student.nameProjectEn,
          timeCreate: new Date().toLocaleString(),
        });
        if(res.statusText === "OK") {
          alert("Bạn đã đăng ký báo cáo thành công !")
          this.$router.push("/student")
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
