import Vue from 'vue';
import Vuex from 'vuex';
import md5 from 'md5';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        connected: false,
        server: '',
        nick: '',
        currentChannel: '',
        channelMessages: {},
        channelUsers: {},
        currentChannelMessages: [],
        currentChannelUsers: []
    },
    getters: {
        connected: state => state.connected,
        server: state => state.server,
        currentChannel: state => state.currentChannel,
        currentChannelMessages: state => state.currentChannelMessages,
        currentChannelUsers: state => state.currentChannelUsers,
        nick: state => state.nick,
    },
    actions: {
        changeChannel({ commit }, channel) {
            commit('addChannel', channel);
            commit('changeChannel', channel)
        },
        addMessage({ commit }, messageInfo) {
            commit('addChannel', messageInfo.channel);
            commit('appendMessageToChannel', messageInfo);
        }
    },
    mutations: {
        connectToServer(state, server) {
            state.connected = true;
            state.server = server;
        },
        changeNick(state, nick) {
            state.nick = nick;
        },
        addChannel(state, channel) {
            if (channel != '' && !(channel in state.channelMessages)) {
                state.channelMessages[channel] = [];
            }
            if (channel != '' && !(channel in state.channelUsers)) {
                state.channelUsers[channel] = [];
            }
        },
        changeChannel(state, channel) {
            state.currentChannel = channel;
            state.currentChannelMessages = state.channelMessages[channel];
            state.currentChannelUsers = state.channelUsers[channel];
        },
        appendMessageToChannel(state, messageInfo) {
            state.channelMessages[messageInfo.channel].push({
                id: messageInfo.id,
                poster: messageInfo.poster,
                timestamp: new Date().toLocaleTimeString(),
                message: messageInfo.message
            });
        },
        updateChannelUsers(state, info) {
            const users = [];
            for (let user of info.users) {
                users.push({
                    id: md5(`${user.hostname}${user.nick}`),
                    hostname: user.hostname,
                    name: user.nick,
                    modes: user.modes
                });
            }

            state.channelUsers[info.channel] = users;
        }
    }
})
