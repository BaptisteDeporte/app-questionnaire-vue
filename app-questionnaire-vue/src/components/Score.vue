<template>
<div>
    <h2>Votre score est de {{score}} !</h2>
    <router-link :to="{name: 'home'}">
        <button type="button" class="btn btn-primary">Retourner à l'accueil</button>
    </router-link>
</div>
</template>

<script>
    export default {
        name: "Score",
        props: ["result"],
        data: function () {
            return{
                score: null
            }
        },
        created(){
            this.score = this.$props.result.score;
        }
    }
</script>

<style scoped>

</style>
