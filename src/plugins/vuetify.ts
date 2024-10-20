import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/util/colors'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const defaults = {
  VBtn: {
    style: 'text-transform: none;',
    variant: 'tonal',
    class: 'rounded-lg'
  },
  VRow: {
    style: 'margin: 0;'
  }
}
const icons = {
  defaultSet: 'mdi'
}
const theme = {
  themes: {
    light: {
      dark: false,
      colors: {
        todo: colors.orange.lighten3,
        inProgress: colors.blue.lighten3,
        done: colors.green.lighten3
      }
    },
    dark: {
      light: false,
      colors: {
        todo: colors.orange.lighten4,
        inProgress: colors.blue.lighten4,
        done: colors.green.lighten4
      }
    },
  },
}

const vuetify = createVuetify({
  components,
  directives,
  defaults,
  theme,
  icons
})

export default vuetify;