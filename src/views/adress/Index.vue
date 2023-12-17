<template>
  <div>
    <van-nav-bar title="收货地址"  left-arrow  @click-left="$router.go(-1)" />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'AdressIndex',
  data () {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ]
    }
  },
  methods: {
    onAdd () {
      this.$router.push('/addadress')
    },
    onEdit (item, index) {
      console.log('编辑地址:' + index)
    }
  }
})
</script>

<style>
</style>
