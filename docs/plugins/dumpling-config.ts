import { globalConfig } from '@frontend/dumpling'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(globalConfig, {
    upload: {
      beforeUpload(file) {
        file.action =
          'https://run.mocky.io/v3/de7ed31f-93f1-4143-b25e-c9249cd77a5c'
        file.name = 'file'
        return file
      },
      beforeResponse(file) {
        if (file.statusCode === 200) {
          const json = JSON.parse(file.responseText ?? '{}')
          file.url = json.url
          file.thumbUrl = json.url
          file.status = 'done'
        } else {
          file.status = 'error'
        }
        return file
      },
    },
  })
})
