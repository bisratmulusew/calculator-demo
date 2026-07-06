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
let memoryValue = 0
let secondMode = false

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
function sqr(x) { return Math.pow(x, 2) }
function cube(x) { return Math.pow(x, 3) }
function yroot(y, x) { return Math.pow(x, 1 / y) }
function factorial(n) {
    if (n < 0) 
        return NaN
    if (n === 0 || n === 1) 
        return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
        result *= i
    }
    return result
}
function updateSecondModeLabels() {
    const sinBtn = document.querySelector('[data-action="sin"]')
    const cosBtn = document.querySelector('[data-action="cos"]')
    const tanBtn = document.querySelector('[data-action="tan"]')
    const sinhBtn = document.querySelector('[data-action="sinh"]')
    const coshBtn = document.querySelector('[data-action="cosh"]')
    const tanhBtn = document.querySelector('[data-action="tanh"]')
    const pow10Btn = document.querySelector('[data-action="power-of-10"]')

    if (secondMode) {
        sinBtn.textContent = "sin⁻¹"
        cosBtn.textContent = "cos⁻¹"
        tanBtn.textContent = "tan⁻¹"
        sinhBtn.textContent = "sinh⁻¹"
        coshBtn.textContent = "cosh⁻¹"
        tanhBtn.textContent = "tanh⁻¹"
        pow10Btn.textContent = "2ˣ"
    } else {
        sinBtn.textContent = "sin"
        cosBtn.textContent = "cos"
        tanBtn.textContent = "tan"
        sinhBtn.textContent = "sinh"
        coshBtn.textContent = "cosh"
        tanhBtn.textContent = "tanh"
        pow10Btn.textContent = "10ˣ"
    }
}
function toDegrees(radians) { return radians * (180 / Math.PI) }
function asinDeg(x) { return toDegrees(Math.asin(x)) }
function acosDeg(x) { return toDegrees(Math.acos(x)) }
function atanDeg(x) { return toDegrees(Math.atan(x)) }
function asinh(x) { return Math.asinh(x) }
function acosh(x) { return Math.acosh(x) }
function atanh(x) { return Math.atanh(x) }

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
                expressionToEvaluate = expressionToEvaluate.replaceAll("asin(", "asinDeg(")
                expressionToEvaluate = expressionToEvaluate.replaceAll("acos(", "acosDeg(")
                expressionToEvaluate = expressionToEvaluate.replaceAll("atan(", "atanDeg(")
            }
            else {
                expressionToEvaluate = expressionToEvaluate.replaceAll("sin(", "Math.sin(")
                expressionToEvaluate = expressionToEvaluate.replaceAll("cos(", "Math.cos(")
                expressionToEvaluate = expressionToEvaluate.replaceAll("tan(", "Math.tan(")
                expressionToEvaluate = expressionToEvaluate.replaceAll("asin(", "Math.asin(")
                expressionToEvaluate = expressionToEvaluate.replaceAll("acos(", "Math.acos(")
                expressionToEvaluate = expressionToEvaluate.replaceAll("atan(", "Math.atan(")
            }

            expressionToEvaluate = expressionToEvaluate.replaceAll("^", "**")
            expressionToEvaluate = expressionToEvaluate.replace(/(-?\d+\.?\d*)yroot(-?\d+\.?\d*)/g, "yroot($1,$2)")


            const openCount = (expressionToEvaluate.match(/\(/g) || []).length
            const closeCount = (expressionToEvaluate.match(/\)/g) || []).length
            expressionToEvaluate += ")".repeat(openCount - closeCount)

            const evaluated = eval(expressionToEvaluate)
            if (isNaN(evaluated)) {
                result.textContent = "Invalid"
                currentExpression = ""
                displayExpression = ""
                return
            }
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
            const funcName = secondMode ? "asin" : "sin"
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + funcName + "(" + trailingNumber
            }
            else {
                currentExpression += funcName + "("
            }
            displayExpression = currentExpression
            break
        }
        case 'cos': {
            justEvaluated = false
            const funcName = secondMode ? "acos" : "cos"
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + funcName + "(" + trailingNumber
            } 
            else {
                currentExpression += funcName + "("
            }
            displayExpression = currentExpression
            break
            }
        case 'tan': {
            justEvaluated = false
            const funcName = secondMode ? "atan" : "tan"
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + funcName + "(" + trailingNumber
            } 
            else {
                currentExpression += funcName + "("
            }
            displayExpression = currentExpression
            break
        }
        case 'sinh': {
            justEvaluated = false
            const funcName = secondMode ? "asinh" : "sinh"
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + funcName + "(" + trailingNumber
            } 
            else {
                currentExpression += funcName + "("
            }
            displayExpression = currentExpression
            break
        }
        case 'cosh': {
            justEvaluated = false
            const funcName = secondMode ? "acosh" : "cosh"
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + funcName + "(" + trailingNumber
            } 
            else {
                currentExpression += funcName + "("
            }
            displayExpression = currentExpression
            break
        }
        case 'tanh': {
            justEvaluated = false
            const funcName = secondMode ? "atanh" : "tanh"
            const match = currentExpression.match(/(-?\d+\.?\d*)$/)
            if (match) {
                const trailingNumber = match[0]
                currentExpression = currentExpression.slice(0, match.index) + funcName + "(" + trailingNumber
            } 
            else {
                currentExpression += funcName + "("
            }
            displayExpression = currentExpression
            break
        }
        case 'square':
            justEvaluated = false
            currentExpression = "sqr(" + currentExpression 
            displayExpression = currentExpression
            break
        case 'cube':
            justEvaluated = false
            currentExpression = "cube(" + currentExpression 
            displayExpression = currentExpression
            break
        case 'power':
            justEvaluated = false
            currentExpression += "^"
            displayExpression = currentExpression
            break
        case 'power-of-10':
            justEvaluated = false
            const base = secondMode ? "2" : "10"
            currentExpression = "(" + base + "^" + currentExpression 
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
        case 'yroot':
            justEvaluated = false
            currentExpression += "yroot"
            displayExpression = currentExpression
            break
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
        case 'factorial':
            justEvaluated = false
            currentExpression = "factorial(" + currentExpression + ")"
            displayExpression = currentExpression
            break
        case 'random':
            justEvaluated = false
            currentExpression += Math.random().toString()
            displayExpression = currentExpression
            break
        case 'angle-mode':
            if (angleMode === 'deg') {
                angleMode = 'rad'
                clickedButton.textContent = 'Deg'
            } 
            else {
                angleMode = 'deg'
                clickedButton.textContent = 'Rad'
            }
            break
        case 'memory-add': {
            const currentValue = parseFloat(currentExpression) || 0
            memoryValue += currentValue
            break
        }
        case 'memory-subtract': {
            const currentValue = parseFloat(currentExpression) || 0
            memoryValue -= currentValue
            break
        }
        case 'memory-recall':
            justEvaluated = false
            currentExpression += memoryValue.toString()
            displayExpression = currentExpression
            break
        case 'memory-clear':
            memoryValue = 0
            break
        case 'second':
            secondMode = !secondMode
            updateSecondModeLabels()
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