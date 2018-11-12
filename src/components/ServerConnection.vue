<template>
    <div id="server-connection" class="empty">
        <div class="empty-icon">
            <i v-if="!loading" class="fas fa-server"></i>
            <div v-else class="loading loading-lg"></div>
        </div>
        <p class="empty-title h5">Connect to Server</p>
        <p class="empty-subtitle">Connect to a server below to start chatting!</p>
        <div class="empty-action">
            <form v-on:submit.prevent="connect">
                <div class="input-group">
                    <input v-model="nick" :disabled="loading" type="text" class="form-input input-lg" placeholder="Nick Name">
                    <input v-model="serverInput" :disabled="loading" type="text" class="form-input input-lg" placeholder="irc.freenode.net">
                    <input type="submit" :disabled="loading" class="btn btn-primary btn-lg input-group-btn" value="Connect">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
    name: 'ServerConnection',
    data() {
        return {
            connected: false,
            nick: '',
            serverInput: 'irc.freenode.net',
            loading: false,
        }
    },
    methods: {
        connect() {
            this.loading = true;
            ipcRenderer.send('server-connection-attempt', this.serverInput, this.nick);
        }
    },
    mounted() {
        ipcRenderer.on('server-connected', event => {
            this.$emit('server-connected', this.serverInput, this.nick);
            this.connected = true;
            this.loading = false;
        });
    }
}
</script>

<style lang="scss">
@import './../css/variables.scss';

#server-connection {
    margin-top: 50px;
    background: none;

    .empty-icon {
        font-size: 32px;
    }
}
</style>
