class Quest {
    constructor(){
        var addElem = (tagName, cont = document.body) => {
            return cont.appendChild(
                document.createElement(tagName)
            )
        }
        var container = addElem("div")
        this.content = [
            [
                {
                    tagName: "pre",
                    attrs: {
                        innerHTML:
                        `
var i = <span contenteditable="true">???</span>
while ( i <span contenteditable="true">???</span> 10 ){
  i<span contenteditable="true">???</span>
}
                        `
                    }
                },
                {
                    tagName: "p",
                    attrs: {
                        innerText: "Замените ???, цикл while должен пройти от нуля до десяти (не включительно)",
                        className: "answText"
                    }
                },
                {
                    tagName: "div",
                    answers:["0", "<", "++"],
                    attrs: {
                            innerText: "Ответить",
                            className: "answBtn"
                     }
                 }
            ]
        ]
        this.addContent = (code, question, answerMass) => {
            var newQuest = JSON.parse(JSON.stringify(this.content[0]))
            newQuest[0].attrs.innerHTML = code
            newQuest[1].attrs.innerText = question
            newQuest[2].answers = answerMass
            this.content.push(newQuest)

        }
        this.createAnswer = (arr, cont) => {
            arr.forEach(
                el => {
                    var elem = addElem(el.tagName, cont)
                    for(var attr in el.attrs){
                        elem[attr] = el.attrs[attr]
                    }
                    if (el.answers){
                        elem.onmousedown = function(event){
                            if(document.querySelectorAll("span")[0].innerText === el.answers[0]
                               && document.querySelectorAll("span")[1].innerText === el.answers[1]
                               && document.querySelectorAll("span")[2].innerText === el.answers[2]) return true
                               else return false
                        }
                    }
                }
            )
            this.curentQuestion++
        }
        this.curentQuestion = 0
    }
}
var qu = new Quest()
console.log(qu,1)

qu.addContent(
`
for ( <span contenteditable="true">???</span> i = 0; i < 20; i++) {
  setTimeout( function () {
      <span contenteditable="true">???</span>( i )
  },<span contenteditable="true">???</span>)
}
`,
"Замените ???. Данный цикл должен выводить в консоль числа от 1 до 20 каждую секунду.",
["let", "console.log", "1000"]
)
qu.addContent(
`
var Sample = function(name){
  <span contenteditable="true">???</span> = name
}
var sample = <span contenteditable="true">???</span>("Vasya")
<span contenteditable="true">???</span>.name   //Должно вернуть "Vasya"
`,
"Замените ???",
["this.name", "new Sample", "sample"]
)
