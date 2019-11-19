<template>
    <div>
        <div v-for="question in questions" v-bind:key="question.title">
            <div v-if="question.id === currentQuestion">
                <h3>{{question.title}}</h3>
                <div v-for="response in question.responses" v-bind:key="response">
                    <input v-model="checked" class="form-check-input" type="checkbox" v-bind:value="response"
                           id="defaultCheck">
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
    // This component is called with a props (id of the survey)
    import PouchDB from 'pouchdb';
    import questionsFile from '../assets/questions'

    var db = new PouchDB('questionnaire');
    export default {
        name: "Survey",
        props: ["id"],
        data: function () {
            return {
                questions: '',
                results: {},
                currentQuestion: null,
                questionsList: [],
                checked: []
            }
        },
        methods: {
            // Get the questions from the JSON file
            getQuestions() {
                this.questions = questionsFile.questions
            },
            // Instantiate the questionsList prop (order to display the questions)
            getQuestionsList() {
                while (this.questionsList.length < 10) {
                    var r = Math.floor(Math.random() * 10) + 1;
                    if (this.questionsList.indexOf(r) === -1) this.questionsList.push(r);
                }
                this.currentQuestion = this.questionsList[0];
                this.results["resultat"] = [];
            },
            // Choose what to do when the next questions is called
            nextQuestion() {
                var r = {};
                r["question"] = this.questions.find(question => question.id === this.currentQuestion).id;
                r["response"] = this.checked;
                this.checked = []
                this.results["resultat"].push(r);

                // If we answered less than 10 questions, get the next question with the order of questionList (The current question is instantiated in the currentQuestion prop)
                if (this.questionsList.indexOf(this.currentQuestion) < 9)
                    this.currentQuestion = this.questionsList[this.questionsList.indexOf(this.currentQuestion) + 1];

                // Else, we calculate the score and we put it with the form's answers
                else {
                    var score = 0;
                    var vm = this;

                    // Get all the results (send by the user) and iterate
                    this.results["resultat"].forEach(function (result) {
                        var responses = vm.questions.find(question => question.id === result["question"])["result"];
                        var test = true;

                        // Check if the length of the user's answers is equal at the expected answers
                        if (result["response"].length === responses.length) {
                            // Check if each users's answer is in the expected answers
                            result["response"].forEach(function (instance) {
                                if (responses.indexOf(instance) === -1) {
                                    test = false;
                                }
                            })
                            // Check if each expected answer is in the user's answers
                            responses.forEach(function (instance) {
                                if (result["response"].indexOf(instance) === -1) {
                                    test = false;
                                }
                            })
                        } else {
                            test = false;
                        }
                        if (test === true) {
                            score++;
                        }
                    });

                    // Put the answers and the score on pouchdb, then redirect to result component with the props score
                    this.results["_id"] = "survey" + "_" + new Date().getTime();
                    this.results["user"] = this.$props.id;
                    this.results["score"] = score;
                    db.put(this.results).then(() => {
                        db.replicate.to('http://127.0.0.1:5984/questionnaire');
                        this.$router.push({name: "score", params: {result: this.results}});
                    }).catch((err) => console.log(err));
                }
            }
        },
        // On created, instantiate those variables
        created() {
            this.getQuestions();
            this.getQuestionsList()
        }
    }
</script>
