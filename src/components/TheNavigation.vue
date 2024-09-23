<template>
    <div id="nav">
        <div class="menu">
            <AppLink id="logo" to="/">
                <img class="logo" src="/images/vue-school-logo.png"/>
                Travel App
            </AppLink>
            <AppLink
                v-for="destination in destinations"
                :key="destination.id"
                :to="{name: 'destination.show', params: {id: destination.id, slug: destination.slug}}"
            >
                {{ destination.name }}
            </AppLink>
            <AppLink :to="{name: 'protected'}">
                Dashboard
            </AppLink>
        </div>
        <div class="menu">
            <AppLink to="https://vueschool.io">Vue School</AppLink>
            <AppLink :to="{name: 'login'}">Login</AppLink>
        </div>
    </div>
    <div id="hidden-nav">
        <AppLink id="logo" to="/">
            <img class="logo" src="/images/vue-school-logo.png"/>
        </AppLink>
        <Slide width="200" right>
            <div class="menu">
                <AppLink
                    v-for="destination in destinations"
                    :key="destination.id"
                    :to="{name: 'destination.show', params: {id: destination.id, slug: destination.slug}}"
                >
                    {{ destination.name }}
                </AppLink>
                <AppLink :to="{name: 'protected'}">
                    Dashboard
                </AppLink>
            </div>
            <div class="menu">
                <AppLink to="https://vueschool.io">Vue School</AppLink>
                <AppLink :to="{name: 'login'}">Login</AppLink>
            </div>
        </Slide>
    </div>
</template>

<script>
import sourceData from '../data.json';
import { Slide } from 'vue3-burger-menu'
export default {
    components: {
        Slide
    },
    data(){
        return {
            destinations: sourceData.destinations,
        }
    }
}
</script>