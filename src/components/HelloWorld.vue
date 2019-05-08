<template>
  <div v-if="user">
    <div v-if="!isTeacher()">
      <HomeStudent/>
    </div>
    <div v-else>
      <HomeTeacher/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HomeStudent from "./user/HomeStudent.vue";
import HomeTeacher from "./user/HomeTeacher.vue";
export default {
  components: { HomeStudent, HomeTeacher },
  data() {
    return {
      exercises: []
    };
  },
  methods: {
    isTeacher() {
      return this.user.role === 1;
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  }
};
</script>

<style>
</style>
