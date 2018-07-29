<template>
    <div>
        <div class="messages-wrap">
            <ul id="messages" v-for="message in chat.messages">
                <li>
                    <p class="user">{{ message.username }}</p>
                    <p class="content">{{ message.content }}</p>
                </li>
            </ul>
        </div>
        <form @submit.prevent="validateMessage" class="form-group message-send form-inline">
            <input type="text" v-model="content" class="form-control col-8 offset-1" placeholder="Write a message..." required>
            <input type="submit" class="btn btn-primary col-2" value="Send">
            <router-link to="/settings" class="settings col-1"></router-link>
        </form>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "Main",
        data() {
          return {
              content: '',
          }
        },
        methods: {
            validateMessage() {
                this.content = this.content.trim();
                if(this.content.length) {
                    this.$store.dispatch('chat/addMessage', this.content);
                    this.content = '';
                }
            }
        },
        computed: {
            ...mapState({
                chat: state => state.chat
            })
        }
    }
</script>