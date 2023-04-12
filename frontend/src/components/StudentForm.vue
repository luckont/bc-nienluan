<template>
  <form class="student-form" @submit.prevent="handleSubmit" ref="studentForm">
    <h2>Cập nhật thông tin báo cáo</h2>
    <div class="form-group">
      <label for="GVHD">Giáo viên hướng dẫn</label>
      <input type="text" id="GVHD" v-model="student.GVHD" required />
    </div>
    <div class="form-group">
      <label for="nameProjectVi">Tên báo cáo bằng Tiếng việt</label>
      <input
        type="text"
        id="nameProjectVi"
        v-model="student.nameProjectVi"
        required
      />
    </div>
    <div class="form-group">
      <label for="nameProjectEn">Tên báo cáo bằng Tiếng anh</label>
      <input
        type="nameProjectEn"
        id="nameProjectEn"
        v-model="student.nameProjectEn"
        required
      />
    </div>
    <!-- <div class="form-group">
      <label for="fileBC">Tên file báo cáo</label>
      <input type="text" id="fileBC" v-model="student.fileBC" required />
    </div> -->
    <button type="submit">Cập nhật</button>
  </form>
</template>

<script>
export default {
  props: {
    student: { type: Object, required: true },
  },
  data() {
    return {
      GVHD: this.student.GVHD || "",
      nameProjectVi: this.student.nameProjectVi || "",
      nameProjectEn: this.student.nameProjectEn || "",
      // fileBC: this.student.fileBC || "",
    };
  },
};
</script>

<style>
.student-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 60%;
}

label {
  font-weight: bold;
}

input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  padding: 0.5rem;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 60%;
}
</style>
