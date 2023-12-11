import { fr } from '@formkit/i18n'
import { defineFormKitConfig } from '@formkit/vue'
import { createFloatingLabelsPlugin } from '@formkit/addons'
import '@formkit/addons/css/floatingLabels'

const config = defineFormKitConfig({
  locales: { fr },
  locale: 'fr',
  plugins: [
    createFloatingLabelsPlugin({
      useAsDefault: true, // defaults to false
    }),
  ]
})

export default config