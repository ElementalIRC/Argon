<template>
    <div id="content">
        <div v-if="!channel" class="empty">
            <div class="empty-icon">
                <i  class="far fa-comments"></i>
            </div>
            <p class="empty-title h5">No Channel Selected</p>
            <p class="empty-subtitle">Try adding a channel by entering it in the field to the left.</p>
        </div>
        <div v-else>
            <div v-if="messages.length > 0" ref="messages" id="messages">
                <Message
                    v-for="message in messages"
                    :key="message.id"
                    :nick="nick"
                    :poster="message.poster"
                    :timestamp="message.timestamp"
                    :message="message.message"
                />
            </div>
            <div v-else class="empty">
                <div class="empty-icon">
                    <i  class="far fa-comments"></i>
                </div>
                <p class="empty-title h5">No messages yet</p>
                <p class="empty-subtitle">Try posting one, or wait for someone else to say something.</p>
            </div>
            <form id="post-form" v-on:submit.prevent="submitMessage">
                <div class="input-group">
                    <input v-model="messageInput" type="text" class="form-input" placeholder="Say something..">
                    <input type="submit" class="btn btn-primary" value="Send">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import Message from './Message.vue';

export default {
    name: 'Messages',
    components: {
        Message: Message
    },
    props: {
        nick: {
            type: String,
            default: '',
        },
        channel: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            messageInput: '',
            messages: []
        }
    },
    methods: {
        submitMessage() {
            this.displayMessage(this.nick, this.messageInput);
            ipcRenderer.send('message-sent', this.nick, this.channel, this.messageInput);
            this.messageInput = null;
        },
        displayMessage(poster, message) {
            const date = new Date();
            const lastMessage = this.messages[this.messages.length-1];

            this.messages.push({
                id: lastMessage ? lastMessage.id + 1 : 0,
                nick: this.nick,
                poster,
                timestamp: date.toLocaleTimeString(),
                message
            });

            this.$nextTick(() => {
                this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
            });
        }
    },
    mounted() {
        ipcRenderer.on('message-received', (event, channel, nick, message) => {
            const currentChannel = this.channel;
            if (channel.toLowerCase() != currentChannel.toLowerCase()) {
                return;
            }
            this.displayMessage(nick, message);
        });
    }
}
</script>

<style lang="scss">
@import './../css/variables.scss';

$post-area-height: 54px;

#content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: $sidebar-width;
    padding: $spacing;

    #messages {
        position: absolute;
        top: 0;
        right: 0;
        bottom: $post-area-height;
        left: 0;
        overflow: auto;
    }

    #post-form {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: $post-area-height;
        padding: $spacing;

        border-top: 1px solid #dedede;
    }

    .empty {
        background: none;

        .empty-icon {
            font-size: 32px;
        }
    }
}
</style>
