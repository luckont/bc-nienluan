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
      <div class="listUsers col-8">
        <h5>Danh sách hội đồng</h5>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã HĐ</th>
              <th>Phòng</th>
              <th>Tên chủ tịch</th>
              <th>Tên ủy viên</th>
              <th>Tên thư ký</th>
              <th>Thời gian BC</th>
              <th>Hình thức</th>
              <th>Cập nhật</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(hoidong, index) in hoidong" :key="hoidong.id">
              <td>{{ index + 1 }}</td>
              <td>{{ hoidong.mshd }}</td>
              <td>{{ hoidong.phong }}</td>
              <td>{{ hoidong.tenchutich }}</td>
              <td>{{ hoidong.tenuyvien }}</td>
              <td>{{ hoidong.tenthuky }}</td>
              <td>{{ hoidong.thoigian }}</td>
              <td>{{ hoidong.hinhthuc }}</td>
              <td>
                <button class="btn" @click="updateHoiDong(hoidong._id)">
                  <i
                    class="fa-regular fa-pen-to-square"
                    style="color: #527dff"
                  ></i>
                </button>
              </td>
              <td>
                <button class="btn" @click="deleteHD(hoidong._id)">
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
      <div v-if="!isUpdateHD" class="add col">
        <h5>Thêm hội đồng</h5>
        <input v-model="mshdAdd" placeholder="Mã HD" />
        <input v-model="phongAdd" placeholder="Phòng" />
        <input v-model="tenchutichAdd" placeholder="Tên chủ tịch" />
        <input v-model="tenuyvienAdd" placeholder="Tên ủy viên" />
        <input v-model="tenthukyAdd" placeholder="Tên thư ký" />
        <input v-model="thoigianAdd" placeholder="Thời gian báo cáo" />
        <input v-model="hinhthucAdd" placeholder="Hình thức báo cáo" />
        <button class="btn btn-primary" @click="addHoiDong()">
          Thêm hội đồng
        </button>
      </div>
      <div v-if="isUpdateHD" class="update col">
        <h5>Cập nhật hội đồng</h5>
        <div class="c">
          <small class="pl-2">Mã HĐ: </small>
          <input v-model="hoidongUp.mshd" />
          <small class="pl-2">Phòng: </small>
          <input v-model="hoidongUp.phong" />
          <small class="pl-2">Tên chủ tịch: </small>
          <input v-model="hoidongUp.tenchutich" />
          <small class="pl-2">Tên ủy viên:</small>
          <input v-model="hoidongUp.tenuyvien" />
          <small class="pl-2">Tên thư ký:</small>
          <input v-model="hoidongUp.tenthuky" />
          <small class="pl-2">Thòi gian báo cáo:</small>
          <input v-model="hoidongUp.thoigian" />
          <small class="pl-2">Hình thức báo cáo:</small>
          <input v-model="hoidongUp.hinhthuc" />
          <button class="btn btn-success w-100" @click="getUpdate()">
            Cập nhật
          </button>
          <button class="btn btn-primary mt-2" @click="isUpdateHD = false">
            Thêm hội đồng
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
      hoidong: [],
      hoidongUp: [],
      mshdAdd: "",
      phongAdd: "",
      tenchutichAdd: "",
      tenuyvienAdd: "",
      tenthukyAdd: "",
      thoigianAdd: "",
      hinhthucAdd: "",
      isUpdateHD: false,
    };
  },
  mounted() {
    this.getHoiDong();
  },
  methods: {
    async getHoiDong() {
      try {
        const res = await axios.get("http://localhost:5000/api/hoidong");
        this.hoidong = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addHoiDong() {
      try {
        const res = await axios.post("http://localhost:5000/api/hoidong", {
          mshd: this.mshdAdd,
          phong: this.phongAdd,
          thoigian: this.thoigianAdd,
          tenchutich: this.tenchutichAdd,
          tenuyvien: this.tenuyvienAdd,
          tenthuky: this.tenthukyAdd,
          hinhthuc: this.hinhthucAdd,
        });
        console.log(res);
        if ((res.status = 200)) {
          alert("Thêm thành công !");
          window.location.reload();
        }
      } catch (error) {
        // console.log(error)
        alert("Thông tin chưa đúng");
      }
    },
    async updateHoiDong(_id) {
      try {
        this.isUpdateHD = true;
        const res = await axios.get(`http://localhost:5000/api/hoidong/${_id}`);
        this.hoidongUp = res.data;
        const id = this.hoidongUp._id;
        console.log(this.hoidongUp.mshd);
      } catch (error) {
        console.log(error);
      }
    },
    async getUpdate() {
      try {
        const id = this.hoidongUp._id;
        const resUp = await axios.put(
          `http://localhost:5000/api/hoidong/${id}`,
          {
            mshd: this.hoidongUp.mshd,
            phong: this.hoidongUp.phong,
            thoigian: this.hoidongUp.thoigian,
            tenchutich: this.hoidongUp.tenchutich,
            tenuyvien: this.hoidongUp.tenuyvien,
            tenthuky: this.hoidongUp.tenthuky,
            hinhthuc: this.hoidongUp.hinhthuc,
          }
        );
        alert("Cập nhật thông tin thành công !");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteHD(_id) {
      if (window.confirm("Bạn có chắc muốn xóa hội đồng này !")) {
        const res = await axios.delete(
          `http://localhost:5000/api/hoidong/${_id}`
        );
        alert("Hội đồng này đã bị xóa");
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
