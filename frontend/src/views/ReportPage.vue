<template>
  <div class="mt-4">
    <h4 class="mb-4 text-center">
      DANH SÁCH HỘI ĐỒNG BẢO VỆ LUẬN VĂN TỐT NGHIỆP <br />
      NGHÀNH CÔNG NGHỆ THÔNG TIN
    </h4>
    <div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>MSSV</th>
            <th class="col-2">HỌ TÊN SV</th>
            <th class="col-2">TÊN ĐỀ TÀI TIẾNG VIỆT</th>
            <th class="col-2">TÊN ĐỀ TÀI TIẾNG ANH</th>
            <th>PHÒNG</th>
            <th>NGÀY</th>
            <th>GIỜ</th>
            <th>GV HƯỚNG DẪN</th>
            <th class="col-2">HỘI ĐỒNG</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in sortedData" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ row.mssv }}</td>
            <td>{{ row.namesv }}</td>
            <td>{{ row.nameProjectVi }}</td>
            <td>{{ row.nameProjectEn }}</td>
            <td>{{ row.phong }}</td>
            <td>{{ row.ngay }}</td>
            <td>{{ availableTimes[row.index - 1] }}</td>
            <td>{{ row.gvhd }}</td>
            <td>
              {{ row.tenchutich }} <br />
              {{ row.tenuyvien }} <br />
              {{ row.tenthuky }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
    //sap xep lai du lieu va reset index = 1 khi ngay thay doi
    sortedData() {
      let index = 1;
      let lastDate = null;
      return this.mergedData
        .sort((a, b) => new Date(`2022/${a.ngay}`) - new Date(`2022/${b.ngay}`))
        .map((row) => {
          if (lastDate !== null && lastDate < row.ngay) {
            index = 1;
          }
          row.index = index;
          index++;
          lastDate = row.ngay;
          return row;
        });
    },
    //merge 2 bang student va hoidong lai voi nhau tai gvhd = tenthuuky
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
            phong: "",
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
          mergedRow.ngay = hoidong ? hoidong.thoigian : "null";
          mergedRow.gio = hoidong ? hoidong.gio : "null";
          mergedRow.phong = hoidong ? hoidong.phong : "null";
          mergedRow.tenchutich = hoidong ? hoidong.tenchutich : "null";
          mergedRow.tenuyvien = hoidong ? hoidong.tenuyvien : "null";
          mergedRow.tenthuky = hoidong ? hoidong.tenthuky : "null";
          mergedData.push(mergedRow);
        }
        return mergedData;
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    //get student
    axios
      .get("/api/students")
      .then((response) => {
        this.students = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    //get hoidong
    axios
      .get("/api/hoidong")
      .then((response) => {
        this.hoidongs = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    //tao mot bang chua thoi gian 7h-11h, 13h-17h cach nhau 40p
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
    //gan bang times vua tao vao availbaleTime
    this.availableTimes = times;


  },
};
</script>
