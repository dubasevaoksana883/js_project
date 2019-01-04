"use strict"
class Game {
  constructor(){
    var createTags = (tagName, container = document.body) => {
      var elem = container.appendChild (document.createElement(tagName))
      return elem
    }
    this.mainCont = createTags ("div")
    this.mainCont.className = "mainGround"
    var parts = [
      {
        name: "castle",
        background: "images/castle.png",
      },
      {
        name: "room",
        background: "images/room.png",
      },
      {
        name: "knight",
        background: "images/knight.png",
      },
      {
        name: "safe",
        background: "images/safe.png",
      },
      {
        name: "room",
        background: "images/room.png",
      },
      {
        name: "room-chest",
        background: "images/room-chest.png",
      },
      {
        name: "book",
        background: "images/book.png",
      },
    ]
    this.scenarioGame = name => {
      var curentPart = parts.filter( elem => elem.name === name)[0]
      this.mainCont.style = `
        background-image: url(${curentPart.background});
        background-size: cover;
        background-repeat: no-repeat;
        `
    }
    this.start = () => {
      var btn = createTags("a", this.mainCont)
      btn.className = "startBtn"
      btn.onclick = function (event){
        event.preventDefault()
        this.scenarioGame("room")
        console.log(this)
        event.target.remove()
      }.bind (this)
    }
  }
}
var game = new Game()
var test = game.mainCont.appendChild(document.createElement("rec-form"))
game.scenarioGame("castle")
test.assignment (game.start)
test.start()
// game.start()
