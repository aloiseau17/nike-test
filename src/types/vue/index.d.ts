export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: {
      capitalize: (value: string) => string
    }
  }
}
