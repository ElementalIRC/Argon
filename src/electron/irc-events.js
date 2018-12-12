const { ipcMain } = require('electron');
const irc = require('irc-framework');
const md5 = require('md5');
const bot = new irc.Client();

let channels = {};
let ipcConnection = null;
let serverConnection = {
    host: '',
    nick: '',
};

module.exports = win => {
    ipcMain.on('server-connection-attempt', (event, host, nick) => {
        bot.connect({
            host,
            port: 6667,
            nick,
        });
        serverConnection.host = host;
        serverConnection.nick = nick;
        ipcConnection = event.sender;
    });

    ipcMain.on('channel-connection-attempt', (event, channelName) => {
        if (channelName in channels) {
            return;
        }

        const channel = bot.channel(channelName);
        channel.join();
        channels[channel.name] = channel;

        channel.updateUsers(() => {
            ipcConnection.send('channel-connected', channelName, channel.users);
        });
    });

    ipcMain.on('message-sent', (event, nick, channel, message) => {
        channel = channels[channel];
        channel.say(message);
    });

    bot.on('registered', () => {
        ipcConnection.send('server-connected', serverConnection.host);
    });

    bot.on('message', event => {
        const nick = serverConnection.nick;
        const type = event.type;
        const target = event.target;
        const sender = event.nick;
        const message = event.message;
        const id = md5(`${target}-${sender}-${message}-${new Date().getTime()}`);

        if (type == 'notice' && target != nick) {
            ipcConnection.send('notice-message-received', id, type, target, sender, message);
        }

        if (target == nick) {
            // Create private message channel.
            if (!(sender in channels)) {
                channels[sender] = bot.channel(sender);
            }
            ipcConnection.send('direct-message-received', id, type, target, sender, message);
            return;
        }
        
        // Channel message
        ipcConnection.send('message-received', id, type, target, sender, message);
    });
};

