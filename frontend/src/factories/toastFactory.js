let id = 0

const defaultOptions = {
  isColor: 'success',
}

export const createToast = (options = {}) => ({
  ...defaultOptions,
  ...options,
  id: id++
})