export default class Ball {
  constructor (game) {
    // this.image = document.getElementById("img_ball")
    this.gameWidth = game.gameWidth
    this.gameHeight = game.gameHeight

    this.speed = { x: 4, y: 2 }
    this.position = { x: 10, y: 10 }
    this.size = 16
  }

  draw (ctx) {
    ctx.fillStyle = '#000'// need to remove
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size)// need to remove
    /* ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    ) */
  }

  update (deltaTime) {
    this.position.x += this.speed.x
    this.position.y += this.speed.y
    if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
      this.speed.x = -this.speed.x
    }
    if (this.position.y > this.gameHeight - this.size || this.position.y < 0) {
      this.speed.y = -this.speed.y
    }
  }
}
