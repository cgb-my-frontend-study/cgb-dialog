import {createApp} from 'vue'
import AlertDialogCom from './AlertDialog.vue'

// prettier-ignore
interface DialogParam {
    title?: string
    content?: string
    left?: number  // 弹窗距离左侧的距离 不传则默认居中
    top?: number   // 弹窗距离顶侧的距离 不传则默认居中
    cancelText?: string // 传入空字符串则不会显示取消按钮
    sureText?: string   // 传入空字符串则不会显示确认按钮
    editable?: boolean  // 是否显示输入框
    canceledOnTouchOutside?: boolean // 点击空白处关闭弹窗
    result?: Function   // 回调用户操作结果
}

// prettier-ignore
export interface ResultParam {
    content: string  // editable 为 true 时，用户输入的文本
    confirm: boolean // 为 true 时，表示用户点击了确定按钮
    cancle: boolean  // 为 true 时，表示用户点击了取消
}

export default class AlertDialog{
  private static mountNode: HTMLElement | null = null

  public static show(param: DialogParam) {
    let app = createApp(AlertDialogCom, {...param})
    this.mountNode = document.createElement('div')
    app.mount(this.mountNode)
    document.body.appendChild(this.mountNode)
  }

  // await用法
  // let res = await DialogAialog.showByAwait({
  //     title: '提示',
  //     content: '确定要作废该条订单吗?',
  // })
  // if (res.confirm) {
  //
  // } else if (res.cancle) {
  //     console.log('web', '用户取消')
  // }
  public static showByAwait(param: DialogParam): Promise<ResultParam> {
    return new Promise((resolve, reject) => {
      param.result = (res: ResultParam) => resolve(res)
      this.show(param)
    })
  }

  public static close() {
    if (!this.mountNode) return
    document.body.removeChild(this.mountNode)
    this.mountNode = null
    // console.log('close', 'DialogAialog已销毁')
  }
}