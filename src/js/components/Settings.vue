<template>
    <div>
        <form @submit.prevent="validateForm" class="form-group form form-inline col-6 offset-3">
            <input type="text" class="col-10" placeholder="Your name..." v-model="newName" required>
            <input type="submit" class="btn btn-primary col-2" value="Save">
        </form>
    </div>
</template>

<script>
    export default {
        name: "Settings",
        data() {
            return {
                newName: ''
            }
        },
        methods: {
            validateForm() {
                this.newName = this.newName.trim();
                if(this.newName.length) {
                    this.$store.dispatch('chat/changeName', this.newName);
                    this.$router.push('/');
                }
            },
        }
    }
</script>