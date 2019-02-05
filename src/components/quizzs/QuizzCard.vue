<template>
  <v-card class="card">
    <h6>{{quizz.name}}</h6>
    <div></div>
    <span class="cursor-text">Preview</span>
    <div>
      <span>{{quizz.votes}} votes &nbsp;</span>
      <span v-if="!quizz.upvoted" class="cursor-text" v-on:click="upvote">Upvote
        <v-icon small>keyboard_arrow_up</v-icon>
      </span>
      <span v-else class="cursor-text" v-on:click="undo">Undo
        <v-icon small>keyboard_arrow_down</v-icon>
      </span>
    </div>
    <div class="footer">
      <span
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
  color: #7a7a7a;
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