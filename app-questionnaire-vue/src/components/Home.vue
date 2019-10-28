<template>
    <div style="height: 100%">
        <div class="container">
            <form v-on:submit="getSurvey">
                <div class="form-group">
                    <label for="firstname">Prénom</label>
                    <input v-model="firstname" class="form-control" id="firstname" placeholder="Entrez votre prénom" required>
                </div>
                <div class="form-group">
                    <label for="lastname">Nom de famille</label>
                    <input v-model="lastname" class="form-control" id="lastname" placeholder="Entrez votre nom" required>
                </div>
                <div class="form-group">
                    <label for="society">Nom de société</label>
                    <input v-model="society" class="form-control" id="society" placeholder="Entrez votre nom de société" required>
                </div>
                <button type="submit" class="btn btn-primary">Commencer le questionnaire</button>
            </form>
        </div>
    </div>
</template>
<script>
    import PouchDB from 'pouchdb';
    var db = new PouchDB('questionnaire');

    export default {
        data () {
            return {
                firstname : 'Jean',
                lastname: 'Yves',
                society: 'GouteuxFood'
            }
        },
        methods: {
            getSurvey: function () {
                var vm = this;
                db.put({
                    "_id": this.firstname + "_" + new Date().getTime(),
                    "surname": this.firstname,
                    "lastname": this.lastname,
                    "society": this.society,
                }).then(function (response) {
                    db.replicate.to('http://127.0.0.1:5984/questionnaire');
                    vm.$router.push({ name:"survey", params:{id: response.id}});
                }).catch((err)=> console.log(err));
            }
        }
    }
</script>
