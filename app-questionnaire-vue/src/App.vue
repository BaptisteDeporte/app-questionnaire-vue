<template>
  <div id="app">
    <div id="nav">
      <router-view/>
    </div>
    <footer class="page-footer font-small unique-color-dark pt-4">
      <div class="container">
        <ul class="list-unstyled list-inline text-right py-2">
          <li class="list-inline-item">
            <h5 class="mb-1">Espace admin : </h5>
          </li>
          <router-link to="/login">
            <button type="button" class="btn btn-primary">Se connecter</button>
          </router-link>
        </ul>
      </div>
    </footer>
  </div>
</template>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
