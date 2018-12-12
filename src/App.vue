<template>
    <div>
        <div id="alerts">
            <div v-for="(alert, id) in alerts" :key="id" class="toast toast-primary">
                <button @click.prevent="deleteAlert(id)" class="btn btn-clear float-right"></button>
                <p>
                    <strong>{{ alert.sender }}:</strong>
                    {{ alert.message }}
                </p>
            </div>
        </div>
        <ServerConnection v-if="!connected" />
        <Sidebar v-if="connected" />
        <Messages v-if="connected" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ipcRenderer } from 'electron';
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
        return {
            alerts: {
            }
        };
    },
    computed: {
        ...mapGetters([
            'connected',
            'server',
            'nick',
            'currentChannel',
        ])
    },
    methods: {
        deleteAlert(id) {
            this.$delete(this.alerts, id);
        }
    },
    mounted() {
        ipcRenderer.on('notice-message-received', (event, id, type, target, sender, message) => {
            this.alerts[id] = {sender, message};
            window.setTimeout(() => {
                this.deleteAlert(id);
            }, 10000);
        });
    }
}
</script>

<style lang="scss">
@import './css/main.scss';
@import './css/mixins.scss';
@import './css/variables.scss';

@include scrollbar();

#alerts {
    z-index: 2;
    position: absolute;
    top: 0;
    right: $spacing;
    width: 50%;

    .toast {
        margin: $spacing 0;
        -webkit-box-shadow: 0 1px 3px 1px #888;
        box-shadow: 0 1px 3px 1px #888;
    }
}
</style>
