<template>
    <div class="row">
        <div class="messagesWrap col-8 offset-2">
            <ul id="messages" class="col-8 offset-2" v-for="message in chat.messages">
                <li>
                    <p class="user">{{ message.user.name }}</p>
                    <p class="content">{{ message.content }}</p>
                </li>
            </ul>
        </div>
        <form @submit.prevent="validateMessage" class="col-8 offset-2 form-group form form-inline">
            <input type="text" v-model="user.content" class="form-control col-10" placeholder="Write a message..." required>
            <input type="submit" class="btn btn-primary col-2" value="Send">
        </form>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "Main",
        data() {
          return {
              user: {
                  content: '',
                  user: {
                      name: 'Вася Шлепкин'
                  }
              }
          }
        },
        methods: {
            validateMessage() {
                this.user.content = this.user.content.trim();
                if(this.user.content.length) {
                    this.$store.dispatch('chat/addMessage', Object.assign({}, this.user));
                    this.clearMessage();
                }
            },
            clearMessage() {
                this.user.content = '';
            }
        },
        computed: {
            ...mapState({
                chat: state => state.chat
            })
        }
    }
</script>