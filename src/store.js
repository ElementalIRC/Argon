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
        currentChannelMessages: [],
        
        channelUsers: {},
        currentChannelUsers: {}
    },
    getters: {
        connected: state => state.connected,
        server: state => state.server,
        nick: state => state.nick,

        currentChannel: state => state.currentChannel,
        currentChannelMessages: state => state.currentChannelMessages,

        currentChannelUsers: state => state.currentChannelUsers,
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
                state.channelUsers[channel] = {};
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
                type: messageInfo.type,
                isAction: messageInfo.type == 'action',
                poster: messageInfo.poster,
                timestamp: new Date().toLocaleTimeString(),
                message: messageInfo.message
            });
        },

        updateChannelUsers(state, info) {
            const users = {};

            for (let user of info.users) {
                users[user.id] = user;
            }

            state.channelUsers[info.channel] = users;
        },
        addUserToChannel(state, info) {
            if (info.channel in state.channelUsers) {
                Vue.set(state.channelUsers[info.channel], info.user.id, info.user);
            }
        },
        removeUserFromChannel(state, info) {
            Vue.delete(state.channelUsers[info.channel], info.user.id);
        }
    }
})
