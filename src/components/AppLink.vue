<template>
    <div>
        <a 
            v-if="isExternal" 
            :href="to"
            target="_blank"
            rel="noopener"
            class="external-link"
        ><slot/>
        </a>
        <router-link 
            v-else 
            v-bind="$props"
            class="internal-link"
        ><slot/>
        </router-link>
    </div>
</template>

<script>
import {RouterLink} from 'vue-router'

export default {
    props: {
        ...RouterLink.props
    },
    computed: {
        isExternal(){
            return typeof this.to === 'string' && this.to.startsWith('http')
        }
    }
}
</script>