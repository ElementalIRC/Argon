<template>
    <div id="sidebar">
        <div v-if="channels.length > 0">
            <strong>{{ channel }}</strong>
            <ul>
                <li v-for="channel in channels" :key="channel">
                    <a class="channel-link">{{ channel }}</a>
                </li>
            </ul>
        </div>
        <div v-if="dmUsers.length > 0">
            <strong>Direct Messages</strong>
            <ul>
                <li v-for="user in dmUsers" :key="user"><a class="channel-user">{{ user }}</a></li>
            </ul>
        </div>
        <div v-if="users.length > 0">
            <strong>Channel Users</strong>
            <ul>
                <li v-for="user in users" :key="user"><a class="channel-user">{{ user }}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            channel: 'irc.freenode.net',
            channels: [
                '#desmond', '#smf', '##php', '#laravel'
            ],
            dmUsers: [
                'Antes', 'Gigawatt', 'Gwenwyfar', 'NanoSector'
            ],
            users: [
                'Chanserv', 'Sigyn', 'albertlast',
                'db``', 'Dragon092', 'eichiro', 'emerson',
                'Geekologis', 'Gigawatt', 'Gwenwyfar', 'handicraftsman',
                'ilbelkyr', 'Kissaki', 'kkmic', 'KnownSyntax', 'Madaara_'
            ]
        }
    }
}
</script>

<style lang="scss">
@import './../css/variables.scss';

#sidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    
    width: $sidebar-width;
    padding: $spacing;

    display: flex;
    flex-direction: column;

    overflow: auto;

    background: $panel-background;
    color: #eee;
    font-size: 0.7rem;

    ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            margin-left: $spacing;

            .channel-link, .channel-user {
                color: #eee;
                text-decoration: none;
            }
        }
    }

    div {
        margin-bottom: $double-spacing;
    }
}
</style>
