export default class Player1 {
  constructor (game) {
    this.player1Picture = document.getElementById('PictureP1')
    this.gameHeight = game.gameHeight
    this.width = 124
    this.height = 124

    this.maxSpeed = 8
    this.speed = 0

    this.position = {
      x: 9 * game.gameWidth / 10 - this.width / 2,
      y: game.gameHeight / 2 - this.height / 2
    }
    this.isFrozen = false
  }

  moveDown () {
    if (!this.isFrozen) {
      this.speed = this.maxSpeed
    }
  }

  moveUp () {
    if (!this.isFrozen) {
      this.speed = -this.maxSpeed
    }
  }

  stop () {
    this.speed = 0
  }

  rotateAndCache (image, angle) {
    var offscreenCanvas = document.createElement('canvas')
    var offscreenCtx = offscreenCanvas.getContext('2d')

    var size = Math.max(image.width, image.height)
    offscreenCanvas.width = size
    offscreenCanvas.height = size

    offscreenCtx.translate(size / 2, size / 2)
    offscreenCtx.rotate(angle)
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2))

    return offscreenCanvas
  }

  draw (ctx) { // will probably need to be replaced like in ball
    this.picture = this.rotateAndCache(this.player1Picture, Math.PI)
    ctx.drawImage(
      this.picture,
      this.position.x,
      this.position.y
    )
  }

  update (deltaTime) {
    this.position.y += this.speed
    if (this.position.y >= this.gameHeight - this.height) this.position.y = this.gameHeight - this.height
    if (this.position.y < 0) this.position.y = 0
  }
}
