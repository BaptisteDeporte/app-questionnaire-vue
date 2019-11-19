<template>
    <div style="height: 100%">
        <div class="container">
            <form v-on:submit="bdGetSurvey">
                <div class="form-group">
                    <label for="bdFirstname">Prénom</label>
                    <input v-model="bdFirstname" class="form-control" id="bdFirstname" placeholder="Entrez votre prénom" required>
                </div>
                <div class="form-group">
                    <label for="bdLastname">Nom de famille</label>
                    <input v-model="bdLastname" class="form-control" id="bdLastname" placeholder="Entrez votre nom" required>
                </div>
                <div class="form-group">
                    <label for="bdSociety">Nom de société</label>
                    <input v-model="bdSociety" class="form-control" id="bdSociety" placeholder="Entrez votre nom de société" required>
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
                bdFirstname : '',
                bdLastname: '',
                bdSociety: ''
            }
        },
        methods: {
            // Create the user on PouchDB and redirect him to the survey component
            bdGetSurvey: function () {
                var vm = this;
                db.put({
                    "_id": this.bdFirstname + "_" + new Date().getTime(),
                    "surname": this.bdFirstname,
                    "bdLastname": this.bdLastname,
                    "bdSociety": this.bdSociety,
                }).then(function (response) {
                    db.replicate.to('http://127.0.0.1:5984/questionnaire');
                    vm.$router.push({ name:"survey", params:{id: response.id}});
                }).catch((err)=> console.log(err));
            }
        }
    }
</script>
