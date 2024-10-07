import { reactive, toRefs } from "vue";

const state = reactive({
  modalVisible: false,
  modalText: '',
  mobileMenuVisible: false,
})

const showModal = async (text: string) => {
  state.modalText = text
  state.modalVisible = true
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
