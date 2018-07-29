import { socket } from './../socketConfig.js';
const state = {
    messages: [],
    username: '',
};

let averageWaitTime = 2000;

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
        })
    },
    changeName({ commit, state }, name = null) {
        return new Promise((resolve, reject) => {
            let defaultName = 'Anonymous' + Math.round(Math.random() * 1000000);
            (name)? defaultName = name: (state.username) && (defaultName = state.username);
            socket.emit('changeName', defaultName);
            socket.on('nameChanged', msg => {
                commit('setName', defaultName);
                resolve(msg);
            });
            setTimeout(() => reject('Ошибка попробуйте позже'), averageWaitTime);
        });
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