<template>
  <div class="mt-4">
    <h4 class="mb-4 text-center">
      DANH SÁCH HỘI ĐỒNG BẢO VỆ LUẬN VĂN TỐT NGHIỆP NGHÀNH CÔNG NGHỆ THÔNG TIN
    </h4>
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>MSSV</th>
          <th class="col-2">HỌ TÊN SV</th>
          <th>TÊN ĐỀ TÀI TIẾNG VIỆT</th>
          <th>TÊN ĐỀ TÀI TIẾNG ANH</th>
          <th>NGÀY</th>
          <th>GIỜ</th>
          <th>GV HƯỚNG DẪN</th>
          <th class="col-2">HỘI ĐỒNG</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(row, index) in sortedData">
          <tr
            :key="index"
            v-if="row.ngay === sortedData[0].ngay"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ row.mssv }}</td>
            <td>{{ row.namesv }}</td>
            <td>{{ row.nameProjectVi }}</td>
            <td>{{ row.nameProjectEn }}</td>
            <td>{{ row.ngay }}</td>
            <td>{{ availableTimes[index] }}</td>
            <td>{{ row.gvhd }}</td>
            <td>
              {{ row.tenchutich }} <br />
              {{ row.tenuyvien }} <br />
              {{ row.tenthuky }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      students: [],
      hoidongs: [],
      availableTimes: [],
    };
  },
  computed: {
    sortedData() {
      return this.mergedData.sort((a, b) => {
        const dateA = new Date(`2022/${a.ngay}`); // chuyển ngày sang định dạng Date để so sánh
        const dateB = new Date(`2022/${b.ngay}`);
        return dateA - dateB; // sắp xếp tăng dần theo ngày
      });
    },
    mergedData() {
      try {
        const mergedData = [];
        for (const student of this.students) {
          const mergedRow = {
            mssv: "",
            namesv: "",
            nameProjectVi: "",
            nameProjectEn: "",
            ngay: "",
            gio: "",
            gvhd: "",
            tenchutich: "",
            tenuyvien: "",
          };
          mergedRow.mssv = student.mssv;
          mergedRow.namesv = student.name;
          mergedRow.nameProjectVi = student.nameProjectVi;
          mergedRow.nameProjectEn = student.nameProjectEn;
          mergedRow.gvhd = student.GVHD;
          // Find the matching hoidong based on gvhd
          const hoidong = this.hoidongs.find(
            (hd) => hd.tenthuky === student.GVHD
          );
          mergedRow.ngay = hoidong ? hoidong.thoigian : "Sai ngay";
          mergedRow.gio = hoidong ? hoidong.gio : "Sai gio";
          mergedRow.tenchutich = hoidong ? hoidong.tenchutich : "Sai chu tich";
          mergedRow.tenuyvien = hoidong ? hoidong.tenuyvien : "Sai chu tich";
          mergedRow.tenthuky = hoidong ? hoidong.tenthuky : "Sai thu ky";
          mergedData.push(mergedRow);
        }
        return mergedData;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    axios
      .get("/api/students")
      .then((response) => {
        this.students = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/api/hoidong")
      .then((response) => {
        this.hoidongs = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    const times = [];
    for (let hour = 7; hour <= 11; hour++) {
      for (let minute = 0; minute < 60; minute += 40) {
        times.push(
          `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`
        );
      }
    }
    times.push("13:30");
    for (let hour = 14; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 40) {
        times.push(
          `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`
        );
      }
    }
    this.availableTimes = times;
    console.log(this.sortedData);
  },
};
</script>
