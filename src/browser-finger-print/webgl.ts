export const getWebglID = (debug = false): string | null => {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('webgl')
    canvas.width = 256
    canvas.height = 128

    const f =
      'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'
    const g =
      'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'

    if (ctx) {
      const h = ctx.createBuffer()
      ctx.bindBuffer(ctx.ARRAY_BUFFER, h)
      const i = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.7321, 0])

      ctx.bufferData(ctx.ARRAY_BUFFER, i, ctx.STATIC_DRAW)

      if (h && 'itemSize' in h && 'numItems' in h) {
        h.itemSize = 3
        h.numItems = 3
      }

      const j = ctx.createProgram()
      const k = ctx.createShader(ctx.VERTEX_SHADER)

      if (k) {
        ctx.shaderSource(k, f)
        ctx.compileShader(k)
      }

      const l = ctx.createShader(ctx.FRAGMENT_SHADER)

      if (j && k && l) {
        ctx.shaderSource(l, g)
        ctx.compileShader(l)
        ctx.attachShader(j, k)
        ctx.attachShader(j, l)
        ctx.linkProgram(j)
        ctx.useProgram(j)
      }

      if (j && 'vertexPosAttrib' in j) {
        j.vertexPosAttrib = ctx.getAttribLocation(j, 'attrVertex')
      }
      if (j && 'offsetUniform' in j) {
        j.offsetUniform = ctx.getUniformLocation(j, 'uniformOffset')
      }

      if (j && 'vertexPosArray' in j && typeof j.vertexPosArray === 'number') {
        ctx.enableVertexAttribArray(j.vertexPosArray)
      }

      if (
        j &&
        'vertexPosAttrib' in j &&
        typeof j.vertexPosAttrib === 'number' &&
        h &&
        'itemSize' in h &&
        typeof h.itemSize === 'number'
      ) {
        ctx.vertexAttribPointer(
          j.vertexPosAttrib,
          h.itemSize,
          ctx.FLOAT,
          !1,
          0,
          0,
        )
      }
      if (j && 'offsetUniform' in j && typeof j.offsetUniform === 'number') {
        ctx.uniform2f(j.offsetUniform, 1, 1)
      }
      if (h && 'numItems' in h && typeof h.numItems === 'number') {
        ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, h.numItems)
      }

      const n = new Uint8Array(canvas.width * canvas.height * 4)
      ctx.readPixels(
        0,
        0,
        canvas.width,
        canvas.height,
        ctx.RGBA,
        ctx.UNSIGNED_BYTE,
        n,
      )

      const result = JSON.stringify(n).replace(/,?"[0-9]+":/g, '')

      if (debug) {
        document.body.appendChild(canvas)
      } else {
        ctx.clear(
          ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT,
        )
      }

      return result
    }
    return null
  } catch {
    return null
  }
}

export const getWebglInfo = () => {
  try {
    const ctx = document.createElement('canvas').getContext('webgl')

    if (ctx) {
      const result = {
        VERSION: String(ctx.getParameter(ctx.VERSION)),
        SHADING_LANGUAGE_VERSION: String(
          ctx.getParameter(ctx.SHADING_LANGUAGE_VERSION),
        ),
        VENDOR: String(ctx.getParameter(ctx.VENDOR)),
        SUPORTED_EXTENSIONS: String(ctx.getSupportedExtensions()),
      }

      return result
    }
    return null
  } catch {
    return null
  }
}
