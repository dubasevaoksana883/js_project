"use strict"
let script = document.createElement( 'script' )
script.src = 'https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js'
document.head.appendChild( script )

class RegistrationForm extends HTMLElement{
    constructor () {
        super ()
        var nextFunc
        var addTag = (nameTag, cont = document.body)=> {
            var elem = cont.appendChild(
                document.createElement (nameTag)
            )
            return elem
        }
        var shadow = this.attachShadow({mode:"open"})
        var mainCont = addTag ("div",shadow )
        console.log(this)
        var buttons = [
            {
                tagName: "div",
                attrs: {
                    innerText: "Вход",
                    style: `
                      margin: 50px;
                      font-size: 32px;
                      text-align: center;
                      padding-bottom: 30px;
                      cursor: pointer;
                    `,
                    onclick: event => {
                           this.startEnter()
                    }
                }
            },
            {
                tagName: "div",
                attrs: {
                    innerText: "Регистрация",
                    style: `
                      margin: 50px;
                      font-size: 32px;
                      text-align: center;
                      cursor: pointer;
                    `,
                    onclick: event => {
                            this.startReg()
                    }
                }
            },
        ]
        var createTags = (arr) => {
            arr.forEach (
                function (currentValue){
                     var elem = addTag (currentValue.tagName, mainCont)
                     for (var attr in currentValue.attrs){
                         elem[attr] = currentValue.attrs[attr]
                     }
                }
            )
        }

        this.start = () => {
            mainCont.innerHTML = ""
            createTags(buttons)
        }
        this.startReg = () => {
            mainCont.innerHTML = ""
            createTags(registData)
        }
        this.startEnter = () => {
            mainCont.innerHTML = ""
            console.log(enterData)
            createTags(enterData)
        }
        this.assignment = func => nextFunc = func
        var registData = [
            {
                tagName: "h1",
                attrs: {
                    innerText: "Регистрация"
                    // className: ""
                }

            },
            {
                tagName: "h3",
                attrs: {
                    innerText: "Введите имя"
                }
            },
            {
                tagName: "input",
                attrs: {
                    id: "lg"
                }
            },
            {
                tagName: "h3",
                attrs: {
                    innerText: "Адрес электроной почты",
                }
            },
            {
                tagName: "input",
                attrs: {
                    type: "email",
                    id: "em"
                }
            },
            {
                tagName: "h3",
                attrs: {
                    innerText: "Введите пароль",
                    //className:
                }
            },
            {
                tagName: "input",
                attrs: {
                    type: "password",
                    id: "ps"
                }
            },
            {
                tagName: "div",
                attrs: {
                    innerText: "Продолжить",
                    style:`
                      font-size: 18px;
                      padding-top: 10px;
                      cursor: pointer;
                    `,
                    onclick: event => {
                            var inp = Array.from(mainCont.children)
                            .filter (
                                elem => elem.tagName === "INPUT"
                            )
                            var prop = inp.every( x => x.value )
                            if (prop){
                                    console.log ("if")
                                    var obj = {}
                                    inp.forEach (el => {
                                            Object.assign(obj, {[el.id]: Sha256.hash(el.value)})
                                    })
                                        if ( inp.some ( el => el.id === "em" )){
                                            localStorage.setItem("user", JSON.stringify(obj))
                                                 this.end(nextFunc)
                                        } else{
                                            console.log("ent")
                                            var checkUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):
                                              {ps: null, lg: null}
                                            if ( checkUser.ps === obj.ps && checkUser.lg === obj.lg){
                                                 this.end(nextFunc)
                                            }else {
                                                  massageError("Такого пользователя нет")
                                                  addBtn()
                                            }
                                        }
                            }else massageError("Заполните поля*")
                    }
                }
            }
        ]
        var enterData = registData.map ((elem, ind)=>{
            var nElem = JSON.parse(JSON.stringify(elem))
            if (ind === 0){
                nElem.attrs.innerText = "Вход"
                return nElem
            }
            if(elem.attrs.onclick){
                nElem.attrs.onclick = elem.attrs.onclick
            }
            if (ind < 3 || ind > 4) return nElem
        }).filter(el => el)
        var massageStyle = "style='position:absolute; bottom:5px; color: red;'"
        var addBtn = () => {
          checkId("btn")
          var btn = addTag("div", mainCont)
          btn.innerText = "Вернуться назад"
          btn.id = "btn"
          btn.onclick = event => {
            this.start()
          }
        }
        var checkId = nid => {
          Array.from(mainCont.children).forEach(el =>{
            el.id === nid ? el.remove() : null
          })
        }
        var massageError = text => {
          checkId("error")
          var mas = addTag("div", mainCont)
          mas.id = "error"
          mas.innerText = text
          mas.style = `
            color: red;
            position: absolute;
            bottom: 10px;
          `
        }
        this.end = func => {
          this.remove()
          typeof func === "function" ? func () : null
        }
    }
}
customElements.define ("rec-form", RegistrationForm)
