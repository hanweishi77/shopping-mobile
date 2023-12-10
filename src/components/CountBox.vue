<template>
  <div class="count-box">
    <button class="minus" @click="subInp" :disabled="value <= 1 ? true : false">-</button>
    <input  class="inp" :value="value" @change="setInp($event.target.value)" type="text">
    <button class="add" @click="addInp">+</button>
  </div>
</template>

<script>
export default {
  name: 'CountBox',
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    addInp () {
      this.$emit('input', this.value + 1)
    },
    subInp () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    setInp (value) {
      // console.log(typeof value)
      this.$emit('input', +value)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
  .add, .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
