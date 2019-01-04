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
        background: "images/castle.png"
      }
    ]
    this.scenarioGame = name => {
      var curentPart = parts.filter( elem => elem.name === name)[0]
      this.mainCont.style.backgroundImage = `url(${curentPart.background})`
    }
    this.start = () => {
      var btn = createTags("a", this.mainCont)
      btn.className = "startBtn"
      btn.onclick = function (event){
        event.preventDefault()
        console.warn( "gamestart")
      }
    }
  }
}
var game = new Game()
var test = game.mainCont.appendChild(document.createElement("rec-form"))
game.scenarioGame("castle")
test.assignment (game.start)
test.start()
// game.start()
