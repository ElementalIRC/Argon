<template>
    <div id="content">
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
                <input type="submit" class="btn btn-primary" value="Post">
            </div>
        </form>
    </div>
</template>

<script>
import Message from './Message.vue';

export default {
    name: 'Messages',
    components: {
        Message: Message
    },
    props: ['nick'],
    data() {
        return {
            messageInput: '',
            messages: []
        }
    },
    methods: {
        submitMessage() {
            const date = new Date();
            const lastMessage = this.messages[this.messages.length-1];

            this.messages.push({
                id: lastMessage ? lastMessage.id + 1 : 0,
                nick: this.nick,
                poster: this.nick,
                timestamp: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
                message: this.messageInput
            });
            this.messageInput = null;

            this.$nextTick(() => {
                this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
            });
        }
    },
    mounted() {
        console.log(this.messages);
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
