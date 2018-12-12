import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        connected: false,
        server: '',
        nick: '',
        currentChannel: '',
        channelMessages: {},
        currentChannelMessages: [],
    },
    getters: {
        connected: state => state.connected,
        server: state => state.server,
        currentChannel: state => state.currentChannel,
        currentChannelMessages: state => state.currentChannelMessages,
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
        },
        changeChannel(state, channel) {
            state.currentChannel = channel;
            state.currentChannelMessages = state.channelMessages[channel];
        },
        appendMessageToChannel(state, messageInfo) {
            state.channelMessages[messageInfo.channel].push({
                id: messageInfo.id,
                poster: messageInfo.poster,
                timestamp: new Date().toLocaleTimeString(),
                message: messageInfo.message
            });
        }
    }
})
