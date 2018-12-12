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
                <strong><i v-html="formattedMessage"></i></strong>
            </p>
            <p v-else v-html="formattedMessage"></p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import md5 from 'md5';
import Autolinker from 'autolinker';
import { shell } from 'electron';

export default {
    name: 'Message',
    props: ['timestamp', 'message', 'poster'],
    data() {
        return {
            formattedMessage: Autolinker.link(this.escape(this.message), {className: 'message-link'}),
            avatarUrl: 'https://www.gravatar.com/avatar/' + md5(this.poster) + '?d=identicon',
            isAction: this.message.includes(this.poster),
            mentioned: this.message.includes(this.nick),
        }
    },
    computed: {
        ...mapGetters(['nick'])
    },
    methods: {
        escape(text) {
            var map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[&<>"']/g, function(m) { return map[m]; });
        }
    },
    mounted() {
        // This binds a click listener to the whole page, but filters out links.
        document.addEventListener('click', event => {
            if (event.target.classList.contains('message-link')) {
                event.preventDefault();
                event.stopPropagation();
                shell.openExternal(event.target.href);
            }
        });
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
