<template>
    <form>
        <div class="form-group">
            <label for="email">Adresse mail</label>
            <input v-model="bdLogin" type="email" class="form-control" id="email" placeholder="Enter email" required>
        </div>
        <div class="form-group">
            <label for="password">Mot de passe</label>
            <input v-model="bdPassword" type="password" class="form-control" id="password" placeholder="Password" required>
        </div>
        <button type="submit" v-on:submit="bdLogin" class="btn btn-primary">Se connecter</button>
    </form>
</template>
<script>
    import PouchDB from 'pouchdb';
    var db = new PouchDB('questionnaire');
    export default {
        data: function () {
            return {
                bdLogin: '',
                bdPassword: ''
            }
        },
        methods: {
            // Check if the credentials are correct
            bdGetLogin: function () {
                db.get(this.bdLogin).then((doc) => {
                    console.log(doc);
                }).catch(err => {
                  console.log(err)
                })
            }
        }
    }
</script>

