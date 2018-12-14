const { ipcMain } = require('electron');
const irc = require('irc-framework');
const md5 = require('md5');
const User = require('../User');
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
            const users = [];
            for (user of channel.users) {
                users.push(new User(user.nick, user.hostname, user.modes));
            }
            ipcConnection.send('channel-connected', channelName, users);
        });
    });

    ipcMain.on('message-sent', (event, isAction, nick, target, message) => {
        const channel = channels[target];
        if (isAction) {
            bot.action(target, message.replace(/\/me\s/i, ''));
        } else {
            channel.say(message);
        }
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

        // Ignore junk from the server; it's probably not important. ;)
        if (type == 'notice' && 'from_server' in event && event.from_server == true) {
            return;
        }

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

    bot.on('join', event => {
        const user = new User(event.nick, event.hostname, []);
        ipcConnection.send('user-joined-channel', event.channel, user);
    });

    bot.on('part', event => {
        const user = new User(event.nick, event.hostname, []);
        ipcConnection.send('user-parted-channel', event.channel, user);
    })
};

