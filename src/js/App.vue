<template>
    <main class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a id="user-greeting">Привет, {{ chat.username }}</a>
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
    import { mapState } from 'vuex';
    export default {
        name: 'App',
        computed: {
            ...mapState({
                chat: state => state.chat
            })
        }
    }
</script>