import { createRouter, createWebHistory } from 'vue-router'
import Blog from "../components/Blog/blog.vue"
const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import("../views/Home.vue")
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
  },
  // {
  //   path: "/edit/:id?",
  //   name: "Edit",
  //   props: true,
  //   component: () => import("../views/Edit.vue")
  // },
  // {
  //   path: "/blog/:id",
  //   name: "Blog",
  //   props: true,
  //   component: () => import("../views/Blog.vue")
  // },
  {
    path: "/",
    name: "Profile",
    component: () => import("../views/profile/index.vue"),
    children: [
      {
        path: "blog/:id",
        name: "Blog",
        props: true,
        component: Blog
      }, {
        path: "edit/:id?",
        name: "Edit",
        props: true,
        component: () => import("../views/Edit.vue")
      }
    ]
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeResolve((to, from, next) => {
  let token = localStorage.getItem("user_token")
  if (to.name !== "Login") {
    if (!token) {
      next("/login")
      return;
    }
  }
  next()
})

export default router
