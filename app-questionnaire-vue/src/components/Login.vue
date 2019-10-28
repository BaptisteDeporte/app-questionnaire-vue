<template>
    <form>
        <div v-bind="truc"></div>
        <div class="form-group">
            <label for="email">Adresse mail</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email">
        </div>
        <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" class="form-control" id="password" placeholder="Password">
        </div>
        <button type="submit" v-on:submit="login" class="btn btn-primary">Se connecter</button>
        <button v-on:click="login">test</button>
    </form>
</template>
<script>
    import PouchDB from 'pouchdb';
    var db = new PouchDB('questionnaire');
    export default {
        data: function () {
            return {
                truc: null
            }
        },
        methods: {
            login: function () {
                db.get('Jean-Yves@gmail.com').then((doc) => {
                    console.log(doc);
                }).catch(err => {
                  console.log(err)
                })
            }
        }
    }
</script>

