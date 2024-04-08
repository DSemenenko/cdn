export const getCanvasID = (debug = false): string | null => {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const text =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?"
    if (ctx) {
      ctx.textBaseline = 'top'
      ctx.font = "14px 'Arial'"
      ctx.textBaseline = 'alphabetic'
      ctx.fillStyle = '#f60'
      ctx.fillRect(125, 1, 62, 20)
      ctx.fillStyle = '#069'
      ctx.fillText(text, 2, 15)
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
      ctx.fillText(text, 4, 17)
    }

    const result = canvas.toDataURL()

    if (debug) {
      document.body.appendChild(canvas)
    } else {
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
    }

    return result
  } catch {
    return null
  }
}
