import { createApp } from 'vue'
import App from './App.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BaseButton from '@/components/base/BaseButton.vue'

const app = createApp(App)

app.config.globalProperties.$filters = {
  capitalize(value: string) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  },
}

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('BaseButton', BaseButton)

app.mount('#app')
