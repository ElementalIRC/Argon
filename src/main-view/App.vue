<template>
    <div>
        <ServerConnection v-if="!connected" @server-connected="serverConnected" />
        <Sidebar
            v-if="connected"
            :server="server"
            :nick="nick"
            @channel-change="changeChannel"
        />
        <Messages
            v-if="connected"
            :nick="nick"
            :channel="currentChannel"
        />
    </div>
</template>

<script>
import ServerConnection from '../components/ServerConnection.vue';
import Sidebar from '../components/Sidebar.vue';
import Messages from '../components/Messages.vue';

export default {
    components: {
        ServerConnection,
        Sidebar,
        Messages
    },
    data() {
        return {
            connected: false,
            server: '',
            nick: '',
            channels: [],
            currentChannel: '',
        };
    },
    methods: {
        serverConnected(server, nick) {
            this.connected = true;
            this.server = server;
            this.nick = nick;
        },
        addChannel(channel) {
            this.channels.push(channel);
        },
        changeChannel(channel) {
            this.currentChannel = channel;
        }
    }
}
</script>

<style lang="scss">
@import '../css/main.scss';
@import '../css/mixins.scss';
@import '../css/variables.scss';

@include scrollbar();
</style>
