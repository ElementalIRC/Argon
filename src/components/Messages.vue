<template>
    <div id="content">
        <div v-if="!isInChannel" class="empty">
            <div class="empty-icon">
                <i  class="far fa-comments"></i>
            </div>
            <p class="empty-title h5">No Channel Selected</p>
            <p class="empty-subtitle">Try adding a channel by entering it in the field to the left.</p>
        </div>
        <div v-else>
            <div v-if="channelHasMessages" ref="messages" id="messages">
                <Message
                    v-for="(message, index) in messages"
                    :key="index"
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
            channelMessages: {},
        }
    },
    computed: {
        isInChannel() {
            return this.channel != '' && this.channel != null;
        },
        channelHasMessages() {
            if (!this.isInChannel) {
                return false;
            }
            return this.channelMessages[this.channel].length > 0;
        },
        messages() {
            return this.channelMessages[this.channel];
        }
    },
    watch: {
        // Create a new messages array when a channel is joined.
        channel(newChannel, oldChannel) {
            this.addChannel(newChannel);
        }
    },
    methods: {
        submitMessage() {
            this.addMessage(this.channel, this.nick, this.messageInput);
            ipcRenderer.send('message-sent', this.nick, this.channel, this.messageInput);
            this.messageInput = null;
        },
        addChannel(channel) {
            if (channel == '' || channel in this.channelMessages) {
                return;
            }
            this.$set(this.channelMessages, channel, []);
        },
        addMessage(channel, poster, message) {
            this.addChannel(channel);
            // Append the message to the channel.
            this.channelMessages[channel].push({
                nick: this.nick,
                poster,
                timestamp: new Date().toLocaleTimeString(),
                message
            });
            // If posted in current channel, scroll down.
            if (channel.toLowerCase() == this.channel.toLowerCase()) {
                this.scrollDown();
            }
        },
        scrollDown(poster, message) {
            this.$nextTick(() => {
                this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
            });
        },
    },
    mounted() {
        ipcRenderer.on('message-received', (event, type, channel, nick, message) => {
            if (type == 'notice') {
                return; // Eventually put in a notice system.
            }
            this.addMessage(channel, nick, message);
        });

        ipcRenderer.on('direct-message-received', (event, target, poster, message) => {
            this.addChannel(poster);
            this.addMessage(poster, poster, message);
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
