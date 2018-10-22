<template>
  <div>
    <Sidebar />
    <Messages nick="TehCraw" />
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import Messages from './components/Messages.vue';

export default {
    components: {
        Sidebar: Sidebar,
        Messages: Messages
    }
}
</script>

<style lang="scss">
@import './css/main.scss';
@import './css/mixins.scss';
@import './css/variables.scss';

@include scrollbar();
</style>
