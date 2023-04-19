<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên Sinh Viên</th>
          <th>MSSV</th>
          <th>Email</th>
          <th>Tên Tiếng Việt</th>
          <th>Tên Tiếng Anh</th>
          <th>GVHD</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="student.id">
          <td>{{ index + 1 }}</td>
          <td class="col-2">{{ student.name }}</td>
          <td>{{ student.mssv }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.nameProjectVi }}</td>
          <td>{{ student.nameProjectEn }}</td>
          <td>{{ student.GVHD }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      students: [],
    }
  },
  mounted() {
    this.getStudents();
  },
  methods: {
    async getStudents() {
      try {
        const response = await axios.get("/api/students");
        this.students = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
  color: #444;
  border: 1px solid #f2f2f2;
}

th,
td {
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #444;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f2f2f2;
}
</style>
