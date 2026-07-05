const expression = document.getElementById("expressions")
const result = document.getElementById("result")
const scientific = document.getElementById("scientificToggle")
const history = document.getElementById("history")
const container = document.querySelector(".container")
const historyPanel = document.getElementById("historyPanel")
const historyList = document.getElementById("historyList")
const keys = document.getElementById("keys")

let currentExpression = ""
let justEvaluated = false
let displayExpression = ""
let angleMode = 'deg'

keys.addEventListener('click', function(event) {
    const clickedButton = event.target.closest('button')
    if (clickedButton === null){
        return
    }
    const action = clickedButton.dataset.action
    const value = clickedButton.dataset.value
    console.log(action, value)

function toRadians(degrees){
    return degrees * (Math.PI/180)
}
function sinDeg(x) { return Math.sin(toRadians(x)) }
function cosDeg(x) { return Math.cos(toRadians(x)) }
function tanDeg(x) { return Math.tan(toRadians(x)) }
function sinh(x) { return Math.sinh(x) }
function cosh(x) { return Math.cosh(x) }
function tanh(x) { return Math.tanh(x) }
function sqrt(x) { return Math.sqrt(x) }
function cbrt(x) { return Math.cbrt(x) }
function ln(x) { return Math.log(x) }
function log(x) { return Math.log10(x) }

    switch (action){
        case 'number':
            if(justEvaluated){
                currentExpression = ""
                justEvaluated = false
            }
            currentExpression += value
            displayExpression = currentExpression
            break
        case 'decimal':
            if(justEvaluated){
                currentExpression = ""
                justEvaluated = false
            }
            currentExpression += value
            displayExpression = currentExpression
            break
        case 'operator':
            if (justEvaluated){
                justEvaluated = false
            }
            currentExpression += value
            displayExpression = currentExpression
            break
        case 'equals':
            try{
                let expressionToEvaluate = currentExpression

            if (angleMode === 'deg') {
                expressionToEvaluate = expressionToEvaluate.replaceAll("sin(", "sinDeg(")
                expressionToEvaluate = expressionToEvaluate.replaceAll("cos(", "cosDeg(")
                expressionToEvaluate = expressionToEvaluate.replaceAll("tan(", "tanDeg(")
            }
            else {
                expressionToEvaluate = expressionToEvaluate.replaceAll("sin(", "Math.sin(")
                expressionToEvaluate = expressionToEvaluate.replaceAll("cos(", "Math.cos(")
                expressionToEvaluate = expressionToEvaluate.replaceAll("tan(", "Math.tan(")
            }

            const openCount = (expressionToEvaluate.match(/\(/g) || []).length
            const closeCount = (expressionToEvaluate.match(/\)/g) || []).length
            expressionToEvaluate += ")".repeat(openCount - closeCount)

            const evaluated = eval(expressionToEvaluate)
            displayExpression = currentExpression
            result.textContent = evaluated
            currentExpression = evaluated.toString()
            justEvaluated = true

            const historyItem = document.createElement('li')
            historyItem.textContent = currentExpression === evaluated.toString() 
            ? displayExpression + " = " + evaluated 
            : displayExpression + " = " + evaluated
            historyList.prepend(historyItem)

            } catch(error){
                result.textContent = "error"
                currentExpression = ""
                displayExpression = ""
            }
            break
        case 'clear':
            currentExpression = ""
            displayExpression = ""
            break
        case 'delete':
            currentExpression = currentExpression.slice(0, -1)
            displayExpression = currentExpression
            break
        case 'negate': { 
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match){
                const lastNumber = match[0]
                const flipped = (parseFloat(lastNumber)* -1)
                currentExpression = currentExpression.slice(0, match.index) + flipped.toString()
            }
            else if(currentExpression.endsWith('-')){
                displayExpression = currentExpression.slice(0, -1)
            }
            else{
                currentExpression += '-'
            }
            displayExpression = currentExpression
            break
        }
        case 'sin': {
            justEvaluated = false
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + "sin(" + trailingNumber
            }
            else {
                currentExpression += "sin("
            }
            displayExpression = currentExpression
            break
        }
        case 'cos': {
            justEvaluated = false
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + "cos(" + trailingNumber
            } 
            else {
            currentExpression += "cos("
            }
            displayExpression = currentExpression
            break
            }
        case 'tan': {
            justEvaluated = false
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + "tan(" + trailingNumber
            } 
            else {
                currentExpression += "tan("
            }
            displayExpression = currentExpression
            break
        }
        case 'sinh': {
            justEvaluated = false
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + "sinh(" + trailingNumber
            } 
            else {
                currentExpression += "sinh("
            }
            displayExpression = currentExpression
            break
        }
        case 'cosh': {
            justEvaluated = false
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + "cosh(" + trailingNumber
            } 
            else {
                currentExpression += "cosh("
            }
            displayExpression = currentExpression
            break
        }
        case 'tanh': {
            justEvaluated = false
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + "tanh(" + trailingNumber
            } 
            else {
                currentExpression += "tanh("
            }
            displayExpression = currentExpression
            break
        }
        case 'square':
            justEvaluated = false
            currentExpression = "Math.pow(" + currentExpression + ",2)"
            displayExpression = currentExpression
            break
        case 'cube':
            justEvaluated = false
            currentExpression = "Math.pow(" + currentExpression + ",3)"
            displayExpression = currentExpression
            break
        case 'pi':
            justEvaluated = false
            currentExpression += Math.PI.toString()
            displayExpression = currentExpression
            break
        case 'e':
            justEvaluated = false
            currentExpression += Math.E.toString()
            displayExpression = currentExpression
            break
        case 'sqrt': {
            justEvaluated = false
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + "sqrt(" + trailingNumber
            } 
            else {
                currentExpression += "sqrt("
            }
            displayExpression = currentExpression
            break
        }
        case 'cbrt': {
            justEvaluated = false
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + "cbrt(" + trailingNumber
            } 
            else {
                currentExpression += "cbrt("
            }
            displayExpression = currentExpression
            break
        }
        case 'ln': {
            justEvaluated = false
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + "ln(" + trailingNumber
            } 
            else {
                currentExpression += "ln("
            }
            displayExpression = currentExpression
            break
        }
        case 'log': {
            justEvaluated = false
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + "log(" + trailingNumber
            } 
            else {
                currentExpression += "log("
            }
            displayExpression = currentExpression
            break
        }
        case 'open-paren':
            justEvaluated = false
            currentExpression += "("
            displayExpression = currentExpression
            break
        case 'close-paren':
            currentExpression += ")"
            displayExpression = currentExpression
            break
        default:
            console.log('not handled yet:', action, value)
    }
    expression.textContent = displayExpression
})

history.addEventListener('click', function(){
    historyPanel.classList.toggle('open')
    container.classList.toggle('history-open')
})

scientific.addEventListener('click', function(){
    container.classList.toggle('scientific')
})