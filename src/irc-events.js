const { ipcMain } = require('electron');
const irc = require('irc-framework');
const bot = new irc.Client();

module.exports = win => {
    ipcMain.on('server-connection-attempt', (ipcConnected, host, nick) => {
        bot.connect({
            host,
            port: 6667,
            nick,
        });

        let channels = {};

        bot.on('registered', () => {
            ipcConnected.sender.send('server-connected', host);

            ipcMain.on('channel-connection-attempt', (channelEvent, channelName) => {
                if (channelName in channels) {
                    return;
                }

                const channel = bot.channel(channelName);
                channel.join();
                channels[channel.name.toLowerCase()] = channel;

                channel.updateUsers(() => {
                    channelEvent.sender.send('channel-connected', channelName, channel.users);
                });
            });

            bot.on('message', messageEvent => {
                // PM
                if (messageEvent.target == nick && messageEvent.type == 'privmsg') {
                    if (!(messageEvent.nick in channels)) {
                        channels[messageEvent.nick.toLowerCase()] = bot.channel(messageEvent.nick);
                    }
                    ipcConnected.sender.send('direct-message-received', messageEvent.target, messageEvent.nick, messageEvent.message);
                    return;
                }
                
                // Channel message
                ipcConnected.sender.send('message-received', messageEvent.type, messageEvent.target, messageEvent.nick, messageEvent.message);
            });

            ipcMain.on('message-sent', (messageSentEvent, nick, channel, message) => {
                channel = channels[channel.toLowerCase()];
                channel.say(message);
            });
        });
    });
};

