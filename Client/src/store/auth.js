import { reactive } from 'vue';

const state = reactive({
  token: localStorage.getItem('token') || null,
});

const setToken = (newToken) => {
  state.token = newToken;
  if (newToken) {
    localStorage.setItem('token', newToken);
  } else {
    localStorage.removeItem('token');
  }
};

const isLoggedIn = () => !!state.token;

export default {
  state,
  setToken,
  isLoggedIn,
};