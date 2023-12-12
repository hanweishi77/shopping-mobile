export const loginConfirm = {
  // 是否登录判断
  // 1. 未登录，则显示登录确认框，返回 false
  // 2. 已登录，则返回 true
  methods: {
    loginConfirm () {
      // 判断 token 是否存在
      if (!this.$store.state.user.userInfo.token) {
        return false
      }
      return true
    }
  }
}
