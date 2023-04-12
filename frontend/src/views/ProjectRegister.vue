<template>
  <div class="mt-4">
    <h4 class="mb-4 text-center">DANH SÁCH SINH VIÊN ĐÃ ĐĂNG KÝ</h4>
    <StudentList />
  </div>
</template>

<script>
import StudentList from "@/components/StudentList.vue";

export default {
  components: {
    StudentList,
  },
};
</script>
