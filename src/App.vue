<script setup lang="ts">
import AlertDialog,{ResultParam} from './components/AlertDialog'


const openDialog=async (e:any)=>{

  AlertDialog.show({
      title: '提示',
      content: '确定要作废该条订单吗?',
      left: e.x, 
      top: e.y,
      editable: true,
      canceledOnTouchOutside: true,
      result: async (res: ResultParam) => {
        if (res.confirm) {
          console.log('web', '用户确定')
        } else if (res.cancle) {
          console.log('web', '用户取消')
        }
      }
    })
 // 如果不喜欢回调的方式 可以使用await ，即showByAwait方法
 // await用法
  /* let res = await AlertDialog.showByAwait({
      title: '提示',
      content: '确定要作废该条订单吗?',
  })
   if (res.confirm) {
      console.log('web', '用户确定')
   } else if (res.cancle) {
       console.log('web', '用户取消')
  } */

}
</script>

<template>
  <div>
    <input type="button" value="打开窗口" @click="openDialog"/>
  </div>
 
</template>

<style scoped>

</style>
