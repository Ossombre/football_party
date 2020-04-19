export default class Ball {
  constructor (game) {
    // this.image = document.getElementById("img_ball")
    this.gameWidth = game.gameWidth
    this.gameHeight = game.gameHeight

    this.game = game
    this.counter = 0

    this.maxSpeedY = 2
    this.speed = { x: 6, y: this.maxSpeedY }
    this.position = { x: 10, y: 10 }
    this.size = 16
    this.leftTurn = false
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
    const topOfBall = this.position.y
    const leftOfBall = this.position.x
    const rightOfBall = this.position.x + this.size
    const bottomOfBall = this.position.y + this.size
    const leftOfPlayer1 = this.game.player1.position.x
    const bottomOfPlayer1 = this.game.player1.position.y + this.game.player1.height
    const topOfPlayer1 = this.game.player1.position.y
    const rightOfPlayer2 = this.game.player2.position.x + this.game.player2.width
    const bottomOfPlayer2 = this.game.player2.position.y + this.game.player2.height
    const topOfPlayer2 = this.game.player2.position.y
    const centerOfBally = topOfBall + this.size / 2
    if (topOfBall < 0 && bottomOfBall >= topOfPlayer1 && rightOfBall >= leftOfPlayer1) { // ball is stuck between top of p1 and screen borders
      this.position.x = leftOfPlayer1 - this.size
      this.position.y = 0
      this.speed.y = -this.maxSpeedY
      if (this.speed.x > 0) {
        this.speed.x = -this.speed.x
      }
    } else if (bottomOfBall > this.gameHeight && topOfBall <= bottomOfPlayer1 && rightOfBall >= leftOfPlayer1) { // ball is stuck between bottom of p1 and screen borders
      this.position.x = leftOfPlayer1 - this.size
      this.position.y = this.gameHeight - this.size
      this.speed.y = this.maxSpeedY
      if (this.speed.x > 0) {
        this.speed.x = -this.speed.x
      }
    } else if (topOfBall < 0 && bottomOfBall >= topOfPlayer2 && leftOfBall <= rightOfPlayer2) { // ball is stuck between top of p2 and screen borders
      this.position.x = rightOfPlayer2
      this.position.y = 0
      this.speed.y = -this.maxSpeedY
      if (this.speed.x < 0) {
        this.speed.x = -this.speed.x
      }
    } else if (bottomOfBall > this.gameHeight && topOfBall <= bottomOfPlayer2 && leftOfBall <= rightOfPlayer2) { // ball is stuck between bottom of p2 and screen borders
      this.position.x = rightOfPlayer2
      this.position.y = this.gameHeight - this.size
      this.speed.y = this.maxSpeedY
      if (this.speed.x < 0) {
        this.speed.x = -this.speed.x
      }
    } else if (leftOfBall > this.gameWidth - this.size || leftOfBall < 0) { // wall on right or left
      this.speed.x = -this.speed.x
      console.log('( ' + topOfBall + ' > ' + this.game.goalUpper + ' && ' + bottomOfBall + ' < ' + this.game.goalLower + ' )')
      if (topOfBall > this.game.goalUpper && bottomOfBall < this.game.goalLower) {
        console.log('ok')
        if (leftOfBall < 0) {
          this.game.scoreP1++
          if (this.game.scoreP1 >= 5) {
            this.EndGame(false)
          }
        } else {
          this.game.scoreP2++
          if (this.game.scoreP2 >= 5) {
            this.EndGame(true)
          }
        }
      }
    } else if (topOfBall > this.gameHeight - this.size || topOfBall < 0) { // wall on top or bottom
      this.speed.y = -this.speed.y
    } else if (rightOfBall >= leftOfPlayer1 && topOfBall <= bottomOfPlayer1 && bottomOfBall >= topOfPlayer1) { // player 1
      if (!this.leftTurn) {
        this.leftTurn = true
        ++this.counter
      }
      if (this.counter >= 10) { // accelerate ball after 10 side contacts with players
        this.speed.x > 0 ? this.speed.x += 1 : this.speed.x -= 1
        this.counter = 0
      }
      // side of player 1
      if ((centerOfBally <= topOfPlayer1 + this.game.player1.height / 2 && rightOfBall - leftOfPlayer1 <= bottomOfBall - topOfPlayer1) ||
          (centerOfBally >= topOfPlayer1 + this.game.player1.height / 2 && rightOfBall - leftOfPlayer1 <= bottomOfPlayer1 - topOfBall)) {
        if (this.speed.x > 0) {
          this.speed.x = -this.speed.x
        }
        this.position.x = leftOfPlayer1 - this.size
      } else { // top or bottom of player 1
        if ((this.speed.y > 0 && bottomOfBall < topOfPlayer1 + this.game.player1.height / 2) ||
            (this.speed.y < 0 && topOfBall > topOfPlayer1 + this.game.player1.height / 2)) {
          this.speed.y = -this.speed.y
        }
        if (bottomOfBall < topOfPlayer1 + this.game.player1.height / 2) { // top of player 1
          this.position.y = topOfPlayer1 - this.size
        } else { // bottom of player 1
          this.position.y = bottomOfPlayer1
        }
      }
    } else if (leftOfBall <= rightOfPlayer2 && topOfBall <= bottomOfPlayer2 && bottomOfBall >= topOfPlayer2) { // player 2
      if (this.leftTurn) {
        this.leftTurn = false
        ++this.counter
      }
      if (this.counter >= 10) { // accelerate ball after 10 side contacts with players
        this.speed.x > 0 ? this.speed.x += 1 : this.speed.x -= 1
        this.counter = 0
      }
      // side of player 2
      if ((centerOfBally <= topOfPlayer2 + this.game.player2.height / 2 && rightOfPlayer2 - leftOfBall <= bottomOfBall - topOfPlayer2) ||
          (centerOfBally >= topOfPlayer2 + this.game.player2.height / 2 && rightOfPlayer2 - leftOfBall <= bottomOfPlayer2 - topOfBall)) {
        if (this.speed.x < 0) {
          this.speed.x = -this.speed.x
        }
        this.position.x = rightOfPlayer2
      } else { // top or bottom of player 2
        if ((this.speed.y > 0 && bottomOfBall < topOfPlayer2 + this.game.player2.height / 2) ||
            (this.speed.y < 0 && topOfBall > topOfPlayer2 + this.game.player2.height / 2)) {
          this.speed.y = -this.speed.y
        }
        if (bottomOfBall < topOfPlayer2 + this.game.player2.height / 2) { // top of player 2
          this.position.y = topOfPlayer2 - this.size
        } else { // bottom of player 2
          this.position.y = bottomOfPlayer2
        }
      }
    }
  }

  EndGame (winnerLeft) {
    if (winnerLeft) {
      this.game.victory = 'Player 1 wins!'
    } else {
      this.game.victory = 'Player 2 wins!'
    }
    this.game.scoreP1 = 0
    this.game.scoreP2 = 0
    /* this.game.player1.isFrozen = true
    this.game.player2.isFrozen = true
    this.game.player1.stop()
    this.game.player2.stop()
    this.game.player1.position.y = this.game.gameHeight / 2 - this.game.player1.height / 2
    this.game.player2.position.y = this.game.gameHeight / 2 - this.game.player2.height / 2
    this.speed.x = 0
    this.speed.y = 0
    this.position.x = this.game.gameWidth / 2 - this.size / 2
    this.position.y = this.game.gameHeight / 2 - this.size / 2 */
  }
}
