export default class Player2 {
  constructor (game) {
    this.player2Picture = document.getElementById('PictureP2')
    this.gameHeight = game.gameHeight
    this.width = 124
    this.height = 124

    this.maxSpeed = 8
    this.speed = 0

    this.position = {
      x: game.gameWidth / 10 - this.width / 2,
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

  draw (ctx) { // will probably need to be replaced like in ball
    ctx.beginPath()
    ctx.strokeStyle = 'blue'
    ctx.lineWidth = '10'
    ctx.rect(this.position.x, this.position.y, this.width, this.height)// need to remove
    ctx.stroke()
    ctx.drawImage(
      this.player2Picture,
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
