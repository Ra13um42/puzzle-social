import { reactive, toRefs, ref } from "vue";

const state = reactive({
  modalVisible: false,
  modalText: '',
  mobileMenuVisible: false,
  yesNo: false,
  callback: ref<(() => void) | undefined>(undefined),
})

const showModal = async (text: string, yesNo: boolean = false, callback?: () => void) => {
  state.modalText = text
  state.modalVisible = true
  state.yesNo = yesNo
  state.callback = callback
}

const hideModal = async () => {
  state.modalText = ''
  state.modalVisible = false
}

const showMobileMenu = async () => {
  state.mobileMenuVisible = true
}

const hideMobileMenu = async () => {
  state.mobileMenuVisible = false
}

export default function useApp() {
  return {
    ...toRefs(state),
    showModal,
    hideModal,
    showMobileMenu,
    hideMobileMenu,
  }
}
