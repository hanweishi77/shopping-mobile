export const loginConfirm = {
  // 是否登录判断
  // 1. 未登录，则显示登录确认框，返回 false
  // 2. 已登录，则返回 true
  methods: {
    loginConfirm () {
      // 判断 token 是否存在
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '先登录,再继续操作',
          confirmButtonText: '去登陆',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // on confirm
            // 如果希望，跳转到登录 => 登录后能回跳回来，需要在跳转去携带参数 (当前的路径地址)
            // this.$route.fullPath (会包含查询参数)
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(
            // on cancel
            () => {}
          )
        return false
      }
      return true
    }
  }
}
