<template>
    <div class="dialog w-h-100 flex-row flex-center" @click="touchOutside">
      <div ref="refContent" class="dialog-content flex-column pd-10-15 relative" :style="style">
        <div class="dialog-title flex-row flex-between">
          <span>{{ title }}</span>
          <i class="dialog-icon-close t1font t1-close pointer" @click="close"></i>
        </div>
        <div class="content text-secondary">{{ content }}</div>
        <div v-if="editable" class="t-input">
          <input ref="tInput" v-model="inputContent" type="text" placeholder="" class="t-input__inner" />
        </div>
        <div class="footer w-100 flex-row flex-end">
          <button v-if="sureText.length > 0" @click="result(true)" class="btn-confirm">{{ sureText }}</button>
          <button v-if="cancelText.length > 0" @click="result(false)" class="btn-cancel">{{ cancelText }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
    /**
     * @用途
     * @author cgb
     * @创建时间 2023-01-11 15:19
     **/
    import DialogAialog from './AlertDialog'
    import {computed, onMounted, ref, StyleValue} from 'vue'
  
    const props = defineProps({
      title: {type: String, default: '提示'},
      content: {type: String, default: '确定要删除该数据吗?'},
      left: {type: Number, default: 0},
      top: {type: Number, default: 0},
      cancelText: {type: String, default: '取消'},
      sureText: {type: String, default: '确定'},
      editable: {type: Boolean, default: false},
      canceledOnTouchOutside: {type: Boolean, default: true},
      result: {type: Function}
    })
  
    let refContent = ref<HTMLElement | null>(null)
    let style = computed(() => {
      let style: Partial<StyleValue> = {}
      if (props.left || props.top) {
        style.position = 'absolute'
        let cw = document.documentElement.clientWidth
        let ch = document.documentElement.clientHeight
        // 弹窗的宽高
        let contentH = refContent.value?.offsetHeight || 0
        let contentW = refContent.value?.offsetWidth || 0
        let offset = 30 // 调整间隔
        if (props.left < (cw * 1) / 3) {
          // 鼠标点击在屏幕左侧，弹窗要显示在右侧
          style.left = props.left + offset + 'px'
          let top = props.top
          if (ch - top < contentH) top = ch - contentH // 如果鼠标距离最底部 的距离小于弹窗高度
          style.top = top + 'px'
        } else if (props.left > (cw * 1) / 3 && props.left < (cw * 2) / 3) {
          if (props.top < ch / 2) {
            // 鼠标在中间上方点击 则弹窗在正下方显示
            style.top = props.top + offset + 'px'
          } else {
            // 鼠标在中间下方点击 则弹窗在正上方显示
            style.top = props.top - contentH - offset + 'px'
          }
          style.left = props.left - contentW / 2 + 'px'
        } else {
          // 点击屏幕右侧
          style.left = props.left - contentW - offset + 'px'
          let top = props.top
          if (ch - top < contentH) top = ch - contentH // 如果鼠标距离最底部 的距离小于弹窗高度
          style.top = top + 'px'
        }
      }
      return style
    })
  
    let inputContent = ref('')
    let tInput = ref<HTMLElement | null>(null)
    onMounted(() => {
      if (props.editable) setTimeout(() => tInput.value?.focus(), 100)
    })
  
    let touchOutside = (e: any) => {
      if (!props.canceledOnTouchOutside) return
      if (e.target?.classList?.length && e.target.classList[0] == 'dialog') close()
    }
    const close = () => DialogAialog.close()
  
    let result = (isSure: boolean) => {
      if (props.result) props.result({content: inputContent.value, confirm: isSure == true, cancle: isSure == false})
      close()
    }
  </script>
  
  <style scoped>
    /*@import '@assets/ff-ui/icon-font/t1-icon.css';*/
  
    .dialog {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 1024;
      background-color: rgba(0, 0, 0, 0.5);
    }
  

    
    .dialog-content {
      border-radius: 5px;
      box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
      width: 400px;
      height: max-content;
      background-color: orange;/*var(--bg-2)**/
      box-sizing: border-box;
    }
  
    .dialog-title {
      color: white;
      font-size: 16px;
    }
  
    .content {
      font-size: 14px;
    }
  
    .btn-confirm,
    .btn-cancel {
      width: 60px;
      height: 30px;
      border: none;
      outline: none;
      color: #fff;
      background-color: #1664ff;
      margin-left: 10px;
      border-radius: 3px;
      cursor: pointer;
    }
  
    .btn-cancel {
      color: #409eff;
      border: 1px solid #1664ff;
      background-color: #fff;
    }
  
    .btn-cancel:hover {
      background: #ecf5ff;
      color: var(--txt-secondary);
    }
  
    .btn-confirm:hover {
      opacity: 0.8;
    }
  
    .dialog-content > div {
      margin-top: 10px;
    }
  
    .t-input {
      font-size: 14px;
      display: inline-block;
      width: 100%;
    }
  
    .t-input__inner {
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: none;
      padding: 0 15px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;
    }
  
    .dialog-icon-close {
      color: #909399;
      line-height: 15px;
      font-size: 15px;
    }
  
    .dialog-icon-close:hover {
      color: var(--color-link);
    }
  </style>