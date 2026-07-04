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

keys.addEventListener('click', function(event) {
    const clickedButton = event.target.closest('button')
    if (clickedButton === null){
        return
    }
    const action = clickedButton.dataset.action
    const value = clickedButton.dataset.value
    console.log(action, value)

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
            currentExpression += value
            displayExpression = currentExpression
            break
        case 'equals':
            try{
                const evaluated = eval(currentExpression)
                displayExpression = currentExpression
                result.textContent = evaluated
                currentExpression = evaluated.toString()
                justEvaluated = true
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
        case 'negate':
            break
        default:
            console.log('not handled yet:', action, value)
    }
    expression.textContent = displayExpression
})

history.addEventListener('click', function(){
    historyPanel.classList.toggle('open')
})