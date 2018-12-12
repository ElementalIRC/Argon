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
                    v-for="message in currentChannelMessages"
                    :key="message.id"
                    :poster="message.poster"
                    :timestamp="message.timestamp"
                    :message="message.message"
                />
            </div>
            <div v-else class="empty">
                <div class="empty-icon">
                    <i  class="far fa-comments"></i>
                </div>
                <p class="empty-title h5">{{ this.currentChannel }}</p>
                <p class="empty-subtitle">No messages yet! Try posting one, or wait for someone else to say something.</p>
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
import { mapGetters, mapActions } from 'vuex';
import md5 from 'md5';
import Message from './Message.vue';

export default {
    name: 'Messages',
    components: {
        Message: Message
    },
    data() {
        return {
            messageInput: '',
            channelMessages: {},
        }
    },
    computed: {
        ...mapGetters([
            'nick',
            'currentChannel',
            'currentChannelMessages'
        ]),
        isInChannel() {
            return this.currentChannel != '' && this.currentChannel != null;
        },
        channelHasMessages() {
            if (!this.isInChannel) {
                return false;
            }
            return this.$store.getters.currentChannelMessages.length > 0;
        },
    },
    methods: {
        ...mapActions(['addMessage']),
        submitMessage() {
            this.addMessage({
                id: md5(`${this.currentChannel}-${this.nick}-${this.messageInput}-${new Date().getTime()}`),
                channel: this.currentChannel,
                poster: this.nick,
                message: this.messageInput
            });
            ipcRenderer.send('message-sent', this.nick, this.currentChannel, this.messageInput);
            this.messageInput = null;
            this.scrollDown();
        },
        scrollDown(poster, message) {
            this.$nextTick(() => {
                this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
            });
        },
    },
    mounted() {
        ipcRenderer.on('message-received', (event, id, type, channel, poster, message) => {
            this.addMessage({id, channel, poster, message});

            // If posted in current channel, scroll down.
            if (channel == this.currentChannel) {
                this.scrollDown();
            }
        });

        ipcRenderer.on('direct-message-received', (event, id, type, target, poster, message) => {
            this.addMessage({id, channel: poster, poster, message});

            // If posted in current channel, scroll down.
            if (poster == this.currentChannel) {
                this.scrollDown();
            }
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
