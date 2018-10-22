<template>
    <div id="content">
        <div id="messages" ref="messages">
            <Message
                v-for="message in messages"
                :key="message.id"
                :nick="nick"
                :poster="message.poster"
                :timestamp="message.timestamp"
                :message="message.message"
            />
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
import md5 from 'md5';
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
            messages: [
                {
                    id: 1,
                    nick: 'TehCraw',
                    poster: 'Gwenwyfar',
                    timestamp: '12:34:56',
                    message: 'Out for dinner.'
                },
                {
                    id: 2,
                    nick: 'TehCraw',
                    poster: 'TehCraw',
                    timestamp: '12:34:56',
                    message: 'See ya later, Gwenwyfar.'
                },
                {
                    id: 3,
                    nick: 'TehCraw',
                    poster: 'Oldiesmann',
                    timestamp: '12:34:56',
                    message: 'Oldiesmann slaps TehCraw with an oven mitt.'
                },
                {
                    id: 4,
                    nick: 'TehCraw',
                    poster: 'TehCraw',
                    timestamp: '12:34:56',
                    message: 'I\'ll oven your mitt.'
                },
                {
                    id: 5,
                    nick: 'TehCraw',
                    poster: 'Oldiesmann',
                    timestamp: '12:34:56',
                    message: 'lol'
                }
            ]
        }
    },
    methods: {
        submitMessage() {
            const date = new Date();
            const lastMessage = this.messages[this.messages.length-1];
            
            this.messages.push({
                id: lastMessage.id + 1,
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
    }
}
</script>

<style lang="scss">
@import './../css/variables.scss';

$post-area-height: 54px;

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
</style>
