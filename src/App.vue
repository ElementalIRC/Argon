<template>
  <div>
    <div id="sidebar">
        <div id="servers">
            <strong class="server-name">irc.freenode.net</strong>
            <ul>
                <li><a class="channel-link">#desmond</a></li>
                <li><a class="channel-link">#smf</a></li>
                <li class="active"><a class="channel-link">##php</a></li>
                <li><a class="channel-link">#laravel</a></li>
            </ul>
        </div>
        <div id="users">
            <strong>Channel Users</strong>
            <ul>
                <li>
                    <i class="fas fa-microphone-alt"></i>
                    <a class="channel-user badge" data-badge="2">GigaWatt</a>
                </li>
                <li><a class="channel-user badge" data-badge="1">albertlast</a></li>
                <hr>
                <li>
                    <i class="fas fa-crown"></i>
                    <a class="channel-user">Chanserv</a>
                </li>
                <li>
                    <i class="fas fa-crown"></i>
                    <a class="channel-user">Sigyn</a>
                </li>
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
@import './css/mixins.scss';
@import './css/variables.scss';

@include scrollbar();

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

    background: #333;
    color: #eee;

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

    #servers {
        margin-bottom: $spacing;
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
