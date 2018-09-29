<template>
  <h1>this is test</h1>
</template>
<script>

export default {
  created() {
    this.$api.test.postTest({"skuCode":"9K0005595","channel":"APP","userId":"","idPerson":0}).then(res => {
      console.log(res);
    }, err =>{
      console.log(err)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style lang="sass" scoped>

</style>
