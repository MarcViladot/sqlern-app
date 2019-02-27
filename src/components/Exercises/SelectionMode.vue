<template>
  <div>
    <h4>Select the exercise mode</h4>
    <div class="buttons-row" v-if="!mode">
      <v-btn color="primary" v-on:click="mode = 'random'">Random</v-btn>
      <v-btn color="primary" v-on:click="mode = 'topics'">By Topics</v-btn>
      <v-btn color="primary" v-on:click="mode = 'intelligent'">Intelligent mode</v-btn>
    </div>
    <div class="modes">
      <div v-if="mode === 'random'">
        <h5>Random Mode</h5>
        <v-slider label="Number of exercises" v-model="number" thumb-label="always"></v-slider>
      </div>
      <div v-else-if="mode === 'topics'">
        <h5>Topics Mode</h5>
        <div v-for="(topic, index) in topics" :key="topic.id" id="topics">
          <v-checkbox
            :label="topic.name"
            color="primary"
            v-model="checkedTopics[index]"
            :value="topic.name"
          ></v-checkbox>
        </div>
        <v-slider label="Number of exercises" v-model="number" thumb-label="always"></v-slider>
      </div>
      <div v-else-if="mode === 'intelligent'">
        <h5>Intelligent Mode</h5>
        <p>Set of 25 exercises based on your exercises answereds incorrectly</p>
      </div>
    </div>
    <div v-if="mode">
      <v-btn color="secondary" v-on:click="mode = ''">Back</v-btn>
      <v-btn color="primary" v-on:click="generateExercises">Generate Exercises</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SelectionMode",
  data() {
    return {
      mode: "",
      number: 25,
      checkedTopics: []
    };
  },
  methods: {
    generateExercises() {
      const data =  {
        mode: this.mode,
        topics: this.checkedTopics.join('+'),
        limit: this.number
      };
      this.$store.dispatch("exercise/getExercices", data);
      this.$router.push("/exercises/set");
      this.$emit("selected");
      this.mode = "";
    }
  },
  computed:{
    ...mapState({
      topics: state => state.topic.all,
      
    })
  }
};
</script>

<style lang="scss">
.buttons-row {
  button {
    width: 100%;
  }
}
button {
  margin-left: 0 !important;
}
.modes {
  p {
    font-size: 1.1em;
  }
}
</style>