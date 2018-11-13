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
                <li v-for="channel in channels" :key="channel" v-on:click.prevent="changeChannel(channel)">
                    <a class="channel-link">{{ channel }}</a>
                </li>
            </ul>
        </div>
        <div v-if="conversations.length > 0">
            <strong>Conversations</strong>
            <ul>
                <li v-for="user in conversations" :key="user" v-on:click.prevent="changeChannel(user)">
                    <a class="channel-user">{{ user }}</a>
                    <label v-if="user in unreadCount" class="label lavel-rounded">{{ unreadCount[user] }}</label>
                </li>
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
            currentChannel: '',
            channels: [],
            conversations: [],
            users: [],
            unreadCount: {}
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
        },
        changeChannel(channel) {
            this.currentChannel = channel;
            this.$emit('channel-change', channel);
            this.$delete(this.unreadCount, channel);
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

            this.changeChannel(channel);
        });

        ipcRenderer.on('direct-message-received', (event, target, poster, message) => {
            // Add conversation to list.
            if (!this.conversations.includes(poster)) {
                this.conversations.push(poster);
            }

            // Update alert number.
            if (this.currentChannel != poster) { // Unless we're already viewing this convo.
                if (poster in this.unreadCount) {
                    this.$set(this.unreadCount, poster, this.unreadCount[poster] + 1);
                } else {
                    this.$set(this.unreadCount, poster, 1);
                }
            }
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
                cursor: pointer;
            }
        }
    }

    div {
        margin-bottom: $double-spacing;
    }
}
</style>
