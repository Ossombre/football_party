export default class Player1 {
  constructor (game, player1Stats) {
    this.player1Picture = document.getElementById('PictureP1')
    this.gameHeight = game.gameHeight
    this.width = 112 + player1Stats.height * 3
    this.height = 112 + player1Stats.height * 3

    this.maxSpeed = 4 + (player1Stats.speed / 10)
    this.speed = 0

    this.position = {
      x: 9 * game.gameWidth / 10 - this.width / 2,
      y: game.gameHeight / 2 - this.height / 2
    }
  }

  moveDown () {
    this.speed = this.maxSpeed
  }

  moveUp () {
    this.speed = -this.maxSpeed
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

  draw (ctx) {
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.lineWidth = '10'
    ctx.rect(this.position.x, this.position.y, this.width, this.height)// need to remove
    ctx.stroke()
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
