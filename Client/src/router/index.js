import { createRouter, createWebHistory } from 'vue-router';
import EmployeeListView from '../views/EmployeeListView.vue';
import EmployeeDetailView from '../views/EmployeeDetailView.vue';
import EmployeeForm from '../components/EmployeeForm.vue';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import Logout from '../components/Logout.vue';

const routes = [
  {
    path: '/',
    name: 'EmployeeList',
    component: EmployeeListView,
  },
  {
    path: '/employee/:id',
    name: 'EmployeeDetail',
    component: EmployeeDetailView,
  },
  {
    path: '/employee/create',
    name: 'CreateEmployee',
    component: EmployeeForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/employee/edit/:id',
    name: 'EditEmployee',
    component: EmployeeForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;