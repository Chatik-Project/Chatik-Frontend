<template>
    <main class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item"><router-link to="/" class="nav-link">Главная</router-link></li>
                </ul>
            </div>
        </nav>
        <div>
            <router-view></router-view>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'App',
    }
</script>