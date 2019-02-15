<template>
  <div v-if="user">
    <h3>My Profile - {{user.name}} {{user.last_name}}</h3>
    <br>
    <div v-if="!isTeacher()">
      <StudentProfile/>
    </div>
    <div v-else>
      <TeacherProfile />
    </div>
  </div>
</template>

<script>
import StudentProfile from "./StudentProfile.vue";
import TeacherProfile from "./TeacherProfile.vue";
import { mapState } from "vuex";
export default {
  name: "Profile",
  components: {
    StudentProfile,
    TeacherProfile
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