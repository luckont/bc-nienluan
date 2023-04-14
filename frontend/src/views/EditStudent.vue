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
    };
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault();
      const studentId = localStorage.getItem("idDK");
      try {
        const res = await axios.put(`/api/students/${studentId}`, {
          GVHD: this.student.GVHD,
          nameProjectVi: this.student.nameProjectVi,
          nameProjectEn: this.student.nameProjectEn,
          timeCreate: new Date().toLocaleString(),
        });
        if (res.statusText === "OK") {
          alert("Bạn đã cập nhật thành công !");
          this.$router.push("/student");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
