import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Directory from "./views/Directory.vue";
import Expertise from "./views/Expertise.vue";
import ExpertiseResult from "./views/ExpertiseResult.vue";
import Criteria from "./components/Criteria.vue";
import SubCriteria from "./components/SubCriteria.vue";
import Aspects from "./components/Aspects.vue";
import Teachers from "./components/Teachers.vue";
import Course from "./components/Course.vue";
import Reports from "./views/Reports";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/course",
      name: "course",
      component: Course
    },
    {
      path: "/teachers",
      name: "teachers",
      component: Teachers
    },
    {
      path: "/directory",
      name: "directory",
      component: Directory,
      children: [{ path: "", component: Course },
                 { path: "course", component: Course },
                 { path: "teachers", component: Teachers },
                 { path: "aspects", component: Aspects },
                 { path: "subcriteria", component: SubCriteria },
                 { path: "criteria", component: Criteria }
      ]
    },
    {
      path: "/expertise",
      name: "expertise",
      component: Expertise
    },
    {
      path: "/expertise-result",
      name: "expertise-result",
      component: ExpertiseResult
    },
    {
      path: "/reports",
      name: "reports",
      component: Reports
    }
  ]
});
