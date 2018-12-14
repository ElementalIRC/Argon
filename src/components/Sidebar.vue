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
                <li
                    v-for="channel in channels"
                    :key="channel"
                    v-on:click.prevent="joinChannel(channel)"
                    :class="currentChannel == channel ? 'bg-primary s-rounded' : ''"
                >
                    <a class="channel-link">{{ channel }}</a>
                    <label v-if="channel in unreadCount" class="label label-rounded">{{ unreadCount[channel] }}</label>
                </li>
            </ul>
        </div>
        <div v-if="conversations.length > 0">
            <strong>Conversations</strong>
            <ul>
                <li
                    v-for="user in conversations"
                    :key="user"
                    @click.prevent="joinChannel(user)"
                    :class="currentChannel == user ? 'bg-primary' : ''"
                    >
                    <a class="channel-user">{{ user }}</a>
                    <label v-if="user in unreadCount" class="label label-rounded">{{ unreadCount[user] }}</label>
                </li>
            </ul>
        </div>
        <div v-if="channelUserCount > 0">
            <strong>Channel Users ({{ channelUserCount }})</strong>
            <ul>
                <li @click="startConversation(user)" v-for="user in currentChannelUsers" :key="user.id">
                    <a class="channel-user">{{ user.nick }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    name: 'Sidebar',
    data() {
        return {
            addChannelInput: '',
            channels: [],
            conversations: [],
            unreadCount: {}
        }
    },
    methods: {
        ...mapActions(['changeChannel']),
        ...mapMutations([
            'addChannel',
            'updateChannelUsers',
            'addUserToChannel',
            'removeUserFromChannel'
        ]),
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
        joinChannel(channel) {
            this.changeChannel(channel);
            this.$delete(this.unreadCount, channel);
        },
        startConversation(user) {
            // Don't start a conversation with yourself, unless you're slightly nuts.
            if (user.nick == this.nick) {
                return;
            }

            this.addChannel(user.nick);
            this.joinChannel(user.nick);
            if (!this.conversations.includes(user.nick)) {
                this.conversations.push(user.nick);
            }
        }
    },
    computed: {
        ...mapGetters([
            'nick',
            'server',
            'currentChannel',
            'currentChannelUsers'
        ]),
        channelUserCount() {
            return Object.getOwnPropertyNames(this.currentChannelUsers).length - 1;
        }
    },
    mounted() {
        ipcRenderer.on('channel-connected', (event, channel, users) => {
            this.channels.push(channel)

            this.updateChannelUsers({channel, users});

            this.changeChannel(channel);
        });

        ipcRenderer.on('message-received', (event, id, type, channel, poster, message) => {
             // Update alert number.
            if (this.currentChannel != channel) { // Unless we're already viewing this convo.
                if (channel in this.unreadCount) {
                    this.$set(this.unreadCount, channel, this.unreadCount[channel] + 1);
                } else {
                    this.$set(this.unreadCount, channel, 1);
                }
            }            
        });

        ipcRenderer.on('direct-message-received', (event, id, type, target, poster, message) => {
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

        ipcRenderer.on('user-joined-channel', (event, channel, user) => {
            // Only channels need a user list.
            if (/^#/.test(channel)) {
                this.addUserToChannel({channel, user});
            }
        });

        ipcRenderer.on('user-parted-channel', (event, channel, user) => {
            this.removeUserFromChannel({channel, user});
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
            margin: 0.3rem 0;
            padding-left: $spacing;
             
            .channel-link, .channel-user {
                color: #eee;
                text-decoration: none;
                cursor: pointer;
            }

            .label-rounded {
                float: right;
            }
        }
    }

    div {
        margin-bottom: $double-spacing;
    }
}
</style>
