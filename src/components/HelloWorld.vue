<template>
  <div class="col-lg-12">
    <br>
    <NewModelForm />
  </div>
</template>

<script>
import NewExerciseForm from "./exercises/NewExerciseForm.vue";
import NewModelForm from "./conceptualmodels/NewModelForm.vue";
export default {
  components: {
    NewExerciseForm,
    NewModelForm
  }
};
</script>

<style>
</style>
