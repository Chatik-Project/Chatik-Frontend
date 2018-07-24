const state = {
  messages: []
};

const getters = {
    getMessages() {
        return this.state.messages;
    }
};

const actions = {
    loadMessages({ commit }) {
        const messages = [
            {
                content: 'Lorem ipsum dolor sit amet!',
                user: {
                    name: 'Emil'
                }
            },
            {
                content: 'Ipsum sit amet Lorem!',
                user: {
                    name: 'Аноним2312'
                }
            },
            {
                content: 'Ipsum sit amet Lorem!',
                user: {
                    name: 'Вася Пупкин'
                }
            }
        ];
        commit('setMessages', messages);
    },
    addMessage({ commit }, user) {
        commit('setMessage', user);
    }
};

const mutations = {
    setMessages(state, messages) {
        state.messages = messages;
    },
    setMessage(state, user) {
        state.messages.push(user);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}