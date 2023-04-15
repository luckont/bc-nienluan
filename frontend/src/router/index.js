import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import ProjectRegister from "@/views/ProjectRegister.vue";
import InfoPage from "@/views/InfoPage.vue";
import StudentPage from "@/views/StudentPage.vue";
import EditStudent from "@/views/EditStudent.vue";
import AddStudent from "@/views/AddStudent.vue";
import NotFound from "@/views/NotFound.vue";
import Admin from "@/views/Admin.vue";

const routes = [
  {
    path: "/",
    name: "loginpage",
    component: LoginPage,
  },
  {
    path: "/home",
    name: "hompage",
    component: HomePage,
  },
  {
    path: "/dangky",
    name: "dangky",
    component: ProjectRegister,
  },
  {
    path: "/info",
    name: "info",
    component: InfoPage,
  },
  {
    path: "/student",
    name: "student",
    component: StudentPage,
  },
  {
    path: "/students/:id",
    name: "student.edit",
    component: EditStudent,
  },
  {
    path: "/students/add",
    name: "student.add",
    component: AddStudent,
  },
  {
    path: "/adminB1910100",
    name: "admin",
    component: Admin,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
