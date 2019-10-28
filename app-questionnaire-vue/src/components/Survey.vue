<template>
    <div>
        <div v-for="question in questions" v-bind:key="question.title">
            <div  v-if="question.id === currentQuestion">
                <h3>{{question.title}}</h3>
                <div v-for="response in question.responses" v-bind:key="response">
                    <input v-model="checked" class="form-check-input" type="checkbox" v-bind:value="response" id="defaultCheck">
                    <label class="form-check-label" for="defaultCheck">
                        {{response}}
                    </label>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-primary" v-on:click="nextQuestion">Prochaine question</button>
    </div>
</template>

<script>
    import PouchDB from 'pouchdb';
    var db = new PouchDB('questionnaire');
    export default {
        name: "Survey",
        props: ["id"],
        data: function() {
            return {
                questions: '',
                results: {},
                currentQuestion: null,
                questionsList: [],
                checked: []
            }
        },
        methods: {
          getQuestions() {
              this.$pouchdb.get('questions').then((doc) => {
                  this.questions = doc.questions
              }).catch((err) => {
                  console.log(err)
              })
          },
          getQuestionsList() {
              while(this.questionsList.length < 10){
                  var r = Math.floor(Math.random()*10) + 1;
                  if(this.questionsList.indexOf(r) === -1) this.questionsList.push(r);
              }
                this.currentQuestion = this.questionsList[0];
                this.results["resultat"] = [];
          },
            nextQuestion() {
              var r = {};
              r["question"] = this.questions.find(question => question.id === this.currentQuestion).id;
              r["response"] = this.checked;
              this.results["resultat"].push(r);
              if (this.questionsList.indexOf(this.currentQuestion) < 9)
                this.currentQuestion = this.questionsList[this.questionsList.indexOf(this.currentQuestion) + 1];
              else {
                  var score = 0;
                  var vm = this;
                  this.results["resultat"].forEach(function(result) {
                      var responses = vm.questions.find(question => question.id === result["question"])["result"];
                      var test = true;
                    if(result["response"].length === responses.length){
                        result["response"].forEach(function(instance){
                            if(responses.indexOf(instance) === -1)
                                test = false;
                        })
                        responses.forEach(function(instance){
                            if(result["response"].indexOf(instance) === -1)
                                test = false;
                        })
                    } else {
                        test = false;
                    }
                    if(test === true) score++;
                  });
                  this.results["_id"] = "survey" + "_" +    new Date().getTime();
                  this.results["user"] = this.$props.id;
                  this.results["score"] = score;
                  db.put(this.results).then(()=> {
                      db.replicate.to('http://127.0.0.1:5984/questionnaire');
                      this.$router.push({ name:"score", params:{result: this.results}});
                  }).catch((err)=> console.log(err));
              }
            }
        },
        created() {
            this.getQuestions();
            this.getQuestionsList()
        }
    }
</script>
