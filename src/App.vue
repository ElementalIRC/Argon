<template>
    <div>
        <ServerConnection v-if="!connected" />
        <Sidebar v-if="connected" />
        <Messages v-if="connected" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ServerConnection from './components/ServerConnection.vue';
import Sidebar from './components/Sidebar.vue';
import Messages from './components/Messages.vue';

export default {
    components: {
        ServerConnection,
        Sidebar,
        Messages
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters([
            'connected',
            'server',
            'nick',
            'currentChannel',
        ])
    },
    methods: {}
}
</script>

<style lang="scss">
@import './css/main.scss';
@import './css/mixins.scss';
@import './css/variables.scss';

@include scrollbar();
</style>
