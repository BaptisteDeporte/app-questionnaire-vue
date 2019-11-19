<template>
<div>
    <h2>Votre score est de {{bdScore}} !</h2>
    <router-link :to="{name: 'home'}">
        <button type="button" class="btn btn-primary">Retourner à l'accueil</button>
    </router-link>
</div>
</template>

<script>
    // This component is called with a props(result) and bind it to the template
    export default {
        name: "Score",
        props: ["result"],
        data: function () {
            return{
                bdScore: null
            }
        },
        created(){
            this.bdScore = this.$props.result.score;
        }
    }
</script>

<style scoped>

</style>
