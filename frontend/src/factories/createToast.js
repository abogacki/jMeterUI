const defaultOptions = {
  isColor: 'success',
  message: () => null
}

let id = 0

export const createToast = (options = {}) => ({
  ...defaultOptions,
  ...options,
  id: id++,
})