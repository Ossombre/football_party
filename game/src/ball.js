export default class Ball {
  constructor (game) {
    // this.image = document.getElementById("img_ball")
    this.gameWidth = game.gameWidth
    this.gameHeight = game.gameHeight

    this.game = game

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
    // wall on left or right
    if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
      this.speed.x = -this.speed.x
    }
    // wall on top or bottom
    if (this.position.y > this.gameHeight - this.size || this.position.y < 0) {
      this.speed.y = -this.speed.y
    }

    // player1
    const rightOfBall = this.position.x + this.size
    const bottomOfBall = this.position.y + this.size
    const topOfBall = this.position.y
    const leftOfPlayer1 = this.game.player1.position.x
    const bottomOfPlayer1 = this.game.player1.position.y + this.game.player1.height
    const topOfPlayer1 = this.game.player1.position.y
    if (this.speed.x > 0 && rightOfBall === leftOfPlayer1 && topOfBall <= bottomOfPlayer1 && bottomOfBall >= topOfPlayer1) {
      this.speed.x = -this.speed.x
      this.position.x = leftOfPlayer1 - this.size
    }
    // no collision on top & bottom right now, might want to allow one of the 2 options bellow:
    /* if (this.speed.y > 0 && bottomOfBall >= topOfPlayer1 && rightOfBall > leftOfPlayer1 && topOfBall < bottomOfPlayer1) {
      // FIRST OPTION:
      // this.speed.y = -this.speed.y
      // this.position.y = topOfPlayer1 - this.size
      // SECOND OPTION (ball teleports, can combine the 2 ifs):
      this.speed.x = -this.speed.x
      this.position.x = leftOfPlayer1 - this.size
      this.position.y = topOfPlayer1 + this.game.player1.height / 2 - this.size / 2
    }
    if (this.speed.y < 0 && topOfBall <= bottomOfPlayer1 && rightOfBall > leftOfPlayer1 && bottomOfBall > topOfPlayer1) {
      // FIRST OPTION:
      // this.speed.y = -this.speed.y
      // this.position.y = bottomOfPlayer1
      // SECOND OPTION:
      this.speed.x = -this.speed.x
      this.position.x = leftOfPlayer1 - this.size
      this.position.y = topOfPlayer1 + this.game.player1.height / 2 - this.size / 2
    } */
    // player2
    const leftOfBall = this.position.x
    const rightOfPlayer2 = this.game.player2.position.x + this.game.player2.width
    const bottomOfPlayer2 = this.game.player2.position.y + this.game.player2.height
    const topOfPlayer2 = this.game.player2.position.y
    if (this.speed.x < 0 && leftOfBall <= rightOfPlayer2 && this.position.y <= bottomOfPlayer2 && this.position.y >= topOfPlayer2) {
      this.speed.x = -this.speed.x
      this.position.x = rightOfPlayer2
    }
  }
}
