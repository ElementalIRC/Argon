<template>
    <div id="content">
        <Message nick="TehCraw" poster="Gwenwyfar" timestamp="17:44:56" message="Out for dinner." />
        <Message nick="TehCraw" poster="TehCraw" timestamp="17:45:23" message="See ya later, Gwenwyfar." />
        <Message nick="TehCraw" poster="Oldiesmann" timestamp="17:52:42" message="Oldiesmann slaps TehCraw with an oven mit." />
        <Message nick="TehCraw" poster="TehCraw" timestamp="17:52:23" message="I'll oven your mitt." />
        <Message nick="TehCraw" poster="Oldiesmann" timestamp="17:53:35" message="lol" />
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
    data() {
        return {
            messages: []
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
</style>
