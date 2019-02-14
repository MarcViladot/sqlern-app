<template>
  <v-card class="card">
    <div class="section">
      <h5 class="float-left">{{quizz.name}}</h5>
      <span v-if="!quizz.upvoted" class="cursor-text float-right" v-on:click="upvote">
        <span>Upvote</span>
        <v-icon small>keyboard_arrow_up</v-icon>
      </span>
      <span v-else class="cursor-text float-right" v-on:click="undo">
        <span>Undo</span>
        <v-icon small>keyboard_arrow_down</v-icon>
      </span>
    </div>

    <router-link class="cursor-text section" :to="'/quizzs/' + quizz.id">Preview</router-link>

    <div class="section">
      <b>Topics:&nbsp;</b>
      <span v-for="(topic, index) in quizz.topics" :key="topic.id">
        <span>{{topic.name}}</span>
        <span v-if="index+1 < quizz.topics.length">,&nbsp;</span>
        <span v-else>.</span>
      </span>
    </div>

    <div class="footer">
      <span>
        <b>{{quizz.votes}}</b> votes
      </span>
      <span
        id="date"
        class="float-right"
      >Created at {{moment(quizz.created_at).format('DD-MM-YYYY')}} by {{quizz.user.name}} {{quizz.user.last_name}}</span>
    </div>
  </v-card>
</template>

<script>
import quizzs from "../../api/quizzs.js";
export default {
  props: {
    quizz: {
      type: Object,
      required: true
    }
  },
  methods: {
    upvote() {
      quizzs
        .upvote(this.quizz.id)
        .then(res => {
          this.quizz.votes += 1;
          this.quizz.upvoted = true;
        })
        .catch(error => console.log(error.response));
    },
    undo() {
      quizzs
        .downvote(this.quizz.id)
        .then(res => {
          this.quizz.votes -= 1;
          this.quizz.upvoted = false;
        })
        .catch(error => console.log(error.response));
    }
  }
};
</script>

<style lang="scss">
.card {
  padding: 10px;
}
.footer {
  font-size: 0.8em;
  #date {
    color: #7a7a7a;
  }
}
.section {
  margin-bottom: 10px;
}
.cursor-text {
  color: black;
  width: min-content;
  &:hover {
    cursor: pointer;
    color: #009688;
  }
}
</style>