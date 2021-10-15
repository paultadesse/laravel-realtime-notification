const state = {
    authStatus: false,
    token: localStorage.getItem("token") || null,
    id: localStorage.getItem("id") || null,
    userName: localStorage.getItem("username") || null
};
const getters = {
    isAuth: state => !!state.token,
    authStatus: state => state.authStatus,
    currentUserToken: state => state.token,
    currentUserId: state => state.id,
    currentUserName: state => state.userName
};
const actions = {
    registerTheUser({ commit }, userData) {
        localStorage.setItem("token", userData.token);
        commit("LOGIN_USER", { userData });
        commit("SET_TOKEN", userData.token);
    },

    loginTheUser({ commit }, userData) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("id", userData.user.id);
        localStorage.setItem("username", userData.user.name);
        commit("LOGIN_USER", { userData });
        commit("SET_TOKEN", userData.token);
    },
    logoutTheUser({ commit }) {
        commit("LOG_OUT_USER");
    }
};
const mutations = {
    LOG_OUT_USER(state) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        state.authStatus = false;
        state.token = null;
        state.userName = null;
        state.userRole = null;
    },
    LOGIN_USER(state, payload) {
        state.user = payload.userData.user.id;
        state.id = payload.userData.user.id;
        state.userName = payload.userData.user.name;
        state.authStatus = true;
    },
    SET_TOKEN(state, payload) {
        state.token = payload;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
