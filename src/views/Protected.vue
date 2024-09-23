<template>
    <div>
        <h1>Greetings, {{ username }}</h1>
        <button @click="logout()">Log out</button>
        <router-link :to="{name: 'invoices'}">
            <button>
                Invoices
            </button>
        </router-link>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username: window.user
        }
    },
    methods: {
        logout(){
            window.user = null
            this.$router.push({
                name: 'Home'
            })
        }
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
}
button {
    margin: 0 5px;
}
</style>