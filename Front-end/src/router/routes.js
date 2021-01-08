export default [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main"),
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("../views/Map"),
  },
];
