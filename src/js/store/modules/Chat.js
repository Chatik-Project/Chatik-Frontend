import io from 'socket.io-client';
var socket = io('http://138.68.234.86:7777');

const state = {
    messages: [],
    username: ''
};

const getters = {
    getMessages() {
        return this.state.messages;
    }
};

const actions = {
    listenMessages({ commit }) {
        socket.on('message', function(msg) {
            commit('setMessage', msg);
        });
    },
    loadLastMessages({ commit }) {
        socket.emit('receiveHistory');
        socket.on('history', function (messages) {
            commit('setMessages', messages);
        });
    },
    changeName({ commit, state }, name = null) {
        let defaultName = 'Anonymous' + Math.round(Math.random() * 1000000);
        if(name == null) {
            if(state.username !== '') {
                defaultName = state.username;
            }
        } else {
            defaultName = name;
        }
        socket.emit('changeName', defaultName);
        commit('setName', defaultName);
    },
    addMessage({ commit }, content) {
        socket.emit('msg', content);
    }
};

const mutations = {
    setMessages(state, messages) {
        state.messages = messages;
    },
    setMessage(state, user) {
        state.messages.push(user);
    },
    setName(state, name) {
        state.username = name;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}