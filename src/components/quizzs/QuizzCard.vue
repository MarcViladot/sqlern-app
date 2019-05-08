<template>
  <v-card class="c">
    <div class="section rowd">
      <div>
        <h5 class="cursor-text" v-on:click="goToQuizz(quizz.id)">{{quizz.name}}</h5>
      </div>
      <div>
        <span v-if="!quizz.upvoted" class="cursor-text float-right" v-on:click="upvote">
          <span>Upvote</span>
          <v-icon small>keyboard_arrow_up</v-icon>
        </span>
        <span v-else class="cursor-text float-right" v-on:click="undo">
          <span>Undo</span>
          <v-icon small>keyboard_arrow_down</v-icon>
        </span>
      </div>
    </div>

    <div class="section">
      <b>Topics:&nbsp;</b>
      <span v-for="(topic, index) in quizz.topics" :key="topic.id">
        <span>{{topic.name}}</span>
        <span v-if="index+1 < quizz.topics.length">,&nbsp;</span>
        <span v-else>.</span>
      </span>
    </div>
    <div class="section">
      <b>Number of exercises:&nbsp;</b>
      <span>{{quizz.exercises.length}}</span>
    </div>

    <div class="rowd footer">
      <div>
        <b>{{quizz.votes}}</b> votes
      </div>
      <div
        id="date"
        class="float-right"
      >Created at {{moment(quizz.created_at).format('DD-MM-YYYY')}} by {{quizz.user.name}} {{quizz.user.last_name}}</div>
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
    },
    goToQuizz(id) {
      this.$router.push("/quizzs/" + id);
    }
  }
};
</script>

<style lang="scss">
.c {
  padding: 10px;
  cursor: pointer;
  margin-bottom: 10px;
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
.rowd {
  display: flex;
  justify-content: space-between;
}
</style>