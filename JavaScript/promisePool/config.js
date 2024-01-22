const __random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const getUploadUrl = () => {
  return function (index) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        __random(1, 10) >= 8 ? reject(index) : resolve(new Error(index))
      }, __random(1, 3) * 1000);
    })
  }
}