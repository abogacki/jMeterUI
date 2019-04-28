let id = 0

const defaultOptions = {
  isColor: 'success',
  message: () => null
}

export const createToast = (options = {}) => ({
  ...defaultOptions,
  ...options,
  id: id++
})