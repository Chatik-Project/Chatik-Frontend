<template>
    <div>
        <form @submit.prevent="validateForm" class="form-group message-send form-inline">
            <p class="alert alert-danger col-12" v-if="error">{{ error }}</p>
            <p class="alert alert-success col-12" v-if="success">{{ success }} redirect {{ seconds }}...</p>
            <input type="text" class="form-control col-8 offset-1" placeholder="Your new name..." v-model="newName" required>
            <input type="submit" class="btn btn-custom-green col-2" value="Save">
        </form>
    </div>
</template>

<script>
    export default {
        name: "Settings",
        data() {
            return {
                newName: '',
                error: '',
                success: '',
                seconds: 3
            }
        },
        methods: {
            validateForm() {
                this.newName = this.newName.trim();
                if(this.newName.length) {
                    this.$store.dispatch('chat/changeName', this.newName).then(resolve => {
                        this.success = resolve;
                        this.error = '';
                        this.timer = setInterval(() => {
                            if(!this.seconds--) {
                                this.$router.push('/');
                            }
                        }, 1000);
                    }).catch(reject => {
                        this.success = '';
                        this.error = reject;
                    });
                }
            },
        },
        destroyed() {
            if('timer' in this) clearInterval(this.timer);
        }
    }
</script>