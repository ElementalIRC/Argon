<template>
    <div id="content">
        <div id="messages">
            <Message
                v-for="message in messages"
                :key="message.id"
                :nick="nick"
                :poster="message.poster"
                :timestamp="message.timestamp"
                :message="message.message"
            />
        </div>
        <div id="post-form">
            <div class="input-group">
                <input type="text" class="form-input" placeholder="Say something..">
                <input type="submit" class="btn btn-primary" value="Post">
            </div>
        </div>
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
    mounted() {
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
