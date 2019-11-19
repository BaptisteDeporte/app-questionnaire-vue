<template>
    <div>
        <div v-for="bdQuestion in bdQuestions" v-bind:key="bdQuestion.title">
            <div v-if="bdQuestion.id === bdCurrentQuestion">
                <h3>{{bdQuestion.title}}</h3>
                <div v-for="bdResponse in bdQuestion.responses" v-bind:key="bdResponse">
                    <input v-model="bdChecked" class="form-check-input" type="checkbox" v-bind:value="bdResponse"
                           id="defaultCheck">
                    <label class="form-check-label" for="defaultCheck">
                        {{bdResponse}}
                    </label>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-primary" v-on:click="bdNextQuestion">Prochaine question</button>
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
                bdQuestions: '',
                bdResults: {},
                bdCurrentQuestion: null,
                bdQuestionsList: [],
                bdChecked: []
            }
        },
        methods: {
            // Get the questions from the JSON file
            bdGetQuestions() {
                this.bdQuestions = questionsFile.questions
            },
            // Instantiate the questionsList prop (order to display the questions)
            bdGetQuestionsList() {
                while (this.bdQuestionsList.length < 10) {
                    var r = Math.floor(Math.random() * 10) + 1;
                    if (this.bdQuestionsList.indexOf(r) === -1) this.bdQuestionsList.push(r);
                }
                this.bdCurrentQuestion = this.bdQuestionsList[0];
                this.bdResults["resultat"] = [];
            },
            // Choose what to do when the next questions is called
            bdNextQuestion() {
                var r = {};
                r["question"] = this.bdQuestions.find(question => question.id === this.bdCurrentQuestion).id;
                r["response"] = this.bdChecked;
                this.bdChecked = []
                this.bdResults["resultat"].push(r);

                // If we answered less than 10 questions, get the next question with the order of questionList (The current question is instantiated in the currentQuestion prop)
                if (this.bdQuestionsList.indexOf(this.bdCurrentQuestion) < 9)
                    this.bdCurrentQuestion = this.bdQuestionsList[this.bdQuestionsList.indexOf(this.bdCurrentQuestion) + 1];

                // Else, we calculate the score and we put it with the form's answers
                else {
                    var score = 0;
                    var vm = this;

                    // Get all the results (send by the user) and iterate
                    this.bdResults["resultat"].forEach(function (result) {
                        var responses = vm.bdQuestions.find(question => question.id === result["question"])["result"];
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
                    this.bdResults["_id"] = "survey" + "_" + new Date().getTime();
                    this.bdResults["user"] = this.$props.id;
                    this.bdResults["score"] = score;
                    db.put(this.bdResults).then(() => {
                        db.replicate.to('http://127.0.0.1:5984/questionnaire');
                        this.$router.push({name: "score", params: {result: this.bdResults}});
                    }).catch((err) => console.log(err));
                }
            }
        },
        // On created, instantiate those variables
        created() {
            this.bdGetQuestions();
            this.bdGetQuestionsList()
        }
    }
</script>
