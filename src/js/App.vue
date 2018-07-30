<template>
    <main id="main" class="col-12">
        <nav class="navbar navbar-expand navbar-dark bg-custom-green row">
            <a id="user-greeting" class="col-4 offset-2">Hi, {{ chat.username }}</a>
            <div class="collapse navbar-collapse justify-content-end col-2 offset-2" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item"><router-link to="/" class="nav-link">Let's chat</router-link></li>
                </ul>
            </div>
        </nav>
        <div class="col-8 offset-2">
            <transition name="fade" mode="out-in" appear>
                <router-view class="col-12"></router-view>
            </transition>
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