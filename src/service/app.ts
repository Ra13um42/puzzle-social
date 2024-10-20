import { reactive, toRefs, ref } from "vue"

const state = reactive({
  modalVisible: false,
  modalText: '',
  modalYesNo: false,
  modalCallback: ref<(() => void) | undefined>(undefined),
  mobileMenuVisible: false,
  isDark: false,
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

const toggleDark = () => {
  state.isDark = !state.isDark
  applyDark()
  saveDark()
}

const initializeDark = () => {
  loadDark()
  applyDark()
}

const loadDark = () => {
  if (localStorage.getItem('isDark')) {
    state.isDark = JSON.parse(localStorage.getItem('isDark') || state.isDark.toString())
  }
}

const saveDark = () => {
  localStorage.setItem('isDark', state.isDark.toString())
}

const applyDark = () => {
  if (state.isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export default function useApp() {
  return {
    ...toRefs(state),
    showModal,
    hideModal,
    showMobileMenu,
    hideMobileMenu,
    toggleDark,
    initializeDark
  }
}
