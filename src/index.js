import "./app.scss";

import Vue from "vue";
import Test from "./test.vue";

window.App = new Vue({
  el: "#app",
  render: h => h(Test)
});
