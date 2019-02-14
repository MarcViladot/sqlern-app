<template>
  <div>
    <h3>My Profile - {{user.name}} {{user.last_name}}</h3>
    <br>
    <div v-if="!isTeacher()">
      <StudentProfile/>
    </div>
    <div v-else>adeu</div>
  </div>
</template>

<script>
import StudentProfile from "./StudentProfile.vue";
import { mapState } from "vuex";
export default {
  name: "Profile",
  components: {
    StudentProfile
  },
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
  methods: {
    isTeacher() {
      return this.user.role === 1;
    }
  }
};
</script>

<style scoped>
</style>