<template>
  <div>
    <div id="sidebar">
        <div id="servers">
            <strong class="server-name">irc.freenode.net</strong>
            <ul>
                <li><a class="channel-link">#desmond</a></li>
                <li><a class="channel-link">#smf</a></li>
                <li><a class="channel-link">##php</a></li>
                <li><a class="channel-link">#laravel</a></li>
            </ul>
        </div>
        <div id="direct-messages">
            <strong>Direct Messages</strong>
            <ul>
                <li><a class="channel-user">Antes</a></li>
                <li>
                    <a class="channel-user badge" data-badge="2">NanoSector</a>
                </li>
            </ul>
        </div>
        <div id="users">
            <strong>Channel Users</strong>
            <ul>
                <li>
                    <i class="fas fa-crown"></i>
                    <a class="channel-user">Chanserv</a>
                </li>
                <li>
                    <i class="fas fa-crown"></i>
                    <a class="channel-user">Sigyn</a>
                </li>
                <li>
                    <i class="fas fa-microphone-alt"></i>
                    <a class="channel-user">GigaWatt</a>
                </li>
                <li><a class="channel-user">albertlast</a></li>
                <li><a class="channel-user">db``</a></li>
                <li><a class="channel-user">Dragon092</a></li>
                <li><a class="channel-user">eichiro</a></li>
                <li><a class="channel-user">emerson</a></li>
                <li><a class="channel-user">Geekologist</a></li>
                <li><a class="channel-user">handicraftsman</a></li>
                <li><a class="channel-user">ilbelkyr</a></li>
                <li><a class="channel-user">Kissaki</a></li>
                <li><a class="channel-user">kkmic</a></li>
                <li><a class="channel-user">KnownSyntax</a></li>
                <li><a class="channel-user">Madaara_</a></li>
                <li><a class="channel-user">marty_mc_fly[m]</a></li>
            </ul>
        </div>
    </div>
    <div id="content">content</div>
  </div>
</template>

<script>
export default {
    mounted() {
    }
}
</script>

<style lang="scss">
@import './css/main.scss';
$sidebar-width: 175px;
$spacing: 8px;

::-webkit-scrollbar-button {
    display: none;
}
::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 8px;
}
::-webkit-scrollbar-thumb:hover {
    background-color: #555;
    border-radius: 8px;
}
::-webkit-scrollbar-track {
    background-color: #333;
}
::-webkit-scrollbar{
    width: 6px;
}

body {
    margin: 0;
    padding: 0;
}

ul {
    margin: 0;
    padding: 0;
    list-style: none;
}
li {
    margin-left: $spacing;
}
.channel-link, .channel-user {
    color: #eee;
    text-decoration: none;
}

#sidebar {
    background: #333;
    color: #eee;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: $sidebar-width;
    padding: $spacing;
    
    #servers, #direct-messages, #users {
        height: 33.33%;
        overflow-y: auto;
    }
}

#content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: $sidebar-width;
    padding: $spacing;
}
</style>
