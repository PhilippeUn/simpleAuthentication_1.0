export default {
    getters: {
        getUser(state) {
            return state.auth.user.data
        }
    }
}