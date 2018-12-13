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
                </li>
            </ul>
        </div>
        <div v-if="conversations.length > 0">
            <strong>Conversations</strong>
            <ul>
                <li
                    v-for="user in conversations"
                    :key="user"
                    v-on:click.prevent="joinChannel(user)"
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
                <li v-for="user in currentChannelUsers" :key="user.id">
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
        ...mapMutations(['updateChannelUsers', 'addUserToChannel', 'removeUserFromChannel']),
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

            console.log('channel-join', users);

            this.updateChannelUsers({channel, users});

            this.changeChannel(channel);
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
            console.log('join', user)
            this.addUserToChannel({channel, user});
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
