<template>
    <div :class="'message' + (mentioned ? ' mentioned' : '')">
        <div class="header">
            <figure class="avatar">
                <img :src="avatarUrl" alt="">
            </figure>
            <div class="post-info">
                <strong class="nick" v-if="!isAction">{{ poster }}</strong>
                <span class="timestamp">{{ timestamp }}</span>
            </div>
        </div>
        <div class="body">
            <p v-if="isAction">
                <strong><i>{{ message }}</i></strong>
            </p>
            <p v-else>{{ message }}</p>
        </div>
    </div>
</template>

<script>
import md5 from 'md5';

export default {
    name: 'Message',
    props: ['nick', 'timestamp', 'message', 'poster'],
    data() {
        return {
            avatarUrl: 'https://www.gravatar.com/avatar/' + md5(this.poster) + '?d=identicon',
            isAction: this.message.includes(this.poster),
            mentioned: this.message.includes(this.nick),
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
@import './../css/variables.scss';

.message {
    padding: $spacing;
    border-bottom: 1px solid #dedede;

    .header {
        display: flex;
        align-items: center;

        .post-info {
            display: flex;
            flex-direction: column;
            margin-left: $spacing;

            .timestamp {
                font-weight: 400;
                font-size: 0.7rem;
                color: #999;
            }
        }
    }

    .body {
        padding-left: 42px;
        
        p {
            margin-bottom: 0;
        }
    }
}

.mentioned {
    background: rgb(253, 236, 242)
}
</style>
