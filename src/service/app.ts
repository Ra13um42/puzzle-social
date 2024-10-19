import { reactive, toRefs, ref } from "vue"

const state = reactive({
  modalVisible: false,
  modalText: '',
  modalYesNo: false,
  modalCallback: ref<(() => void) | undefined>(undefined),
  mobileMenuVisible: false,
})

const showModal = async (text: string, yesNo: boolean = false, callback?: () => void) => {
  state.modalText = text
  state.modalVisible = true
  state.modalYesNo = yesNo
  state.modalCallback = callback
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
