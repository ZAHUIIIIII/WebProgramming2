<template>
  <div>
    Logging out...
  </div>
</template>

<script>
import auth from '../store/auth';

export default {
  name: 'Logout',
  created() {
    auth.setToken(null);
    this.$router.push('/login');
  }
};
</script>