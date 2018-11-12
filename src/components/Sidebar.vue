<template>
    <div id="sidebar">
        <form v-on:submit.prevent="addChannel">
            <div class="form-group">
                <input v-model="addChannelInput" class="form-input" type="text" placeholder="channel +">
            </div>
        </form>
        <div v-if="channels.length > 0">
            <strong>{{ server }}</strong>
            <ul>
                <li v-for="channel in channels" :key="channel">
                    <a class="channel-link">{{ channel }}</a>
                </li>
            </ul>
        </div>
        <div v-if="dmUsers.length > 0">
            <strong>Direct Messages</strong>
            <ul>
                <li v-for="user in dmUsers" :key="user"><a class="channel-user">{{ user }}</a></li>
            </ul>
        </div>
        <div v-if="users.length > 0">
            <strong>Channel Users</strong>
            <ul>
                <li v-for="user in users" :key="user"><a class="channel-user">{{ user }}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
    name: 'Sidebar',
    props: ['nick', 'server'],
    data() {
        return {
            addChannelInput: '',
            channels: [],
            dmUsers: [],
            users: []
        }
    },
    methods: {
        addChannel() {
            const channel = this.addChannelInput;
            this.addChannelInput = '';

            if (this.inChannel(channel)) {
                return;
            }

            ipcRenderer.send('channel-connection-attempt', channel);
        },
        inChannel(channel) {
            for (let i = 0; i < this.channels.length; i++) {
                if (channel == this.channels[i]) {
                    return true;
                }
            }
            return false;
        }
    },
    mounted() {
        ipcRenderer.on('channel-connected', (event, channel, users) => {
            this.channels.push(channel)

            this.users = [];
            for (let i = 0; i < users.length; i++) {
                let user = users[i];
                this.users.push(user.nick);
            }

            this.$emit('channel-change', channel);
        });
    }
}
</script>

<style lang="scss">
@import './../css/variables.scss';

#sidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    
    width: $sidebar-width;
    padding: $spacing;

    display: flex;
    flex-direction: column;

    overflow: auto;

    background: $panel-background;
    color: #eee;
    font-size: 0.7rem;

    ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            margin-left: $spacing;

            .channel-link, .channel-user {
                color: #eee;
                text-decoration: none;
            }
        }
    }

    div {
        margin-bottom: $double-spacing;
    }
}
</style>
