const previousOperationText = document.querySelector('.previous-operation')
const currentOperationText = document.querySelector('.current-operation')
const buttons = document.querySelectorAll('#numbers-container button')

//Construção do objeto calculadora e suas propriedades de cálculo e manipulação dos textos
class Calcutalor {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
        previousOperationText.innerText = ""
        currentOperationText.innerText = ""
    }

    //Adicionando o digito na tela da calculadora
    addDigit(digit){
        //Checando se na operação já tem um digito
        if(digit === '.' && this.currentOperationText.innerText.includes('.')){
            return
        }
        this.currentOperation = digit
        this.updateScreen()
    }

    // Processando as operações da calculadora
    processOperation(operation){
        //Checar se o valor atual está vazio
        if(this.currentOperationText.innerText === "" && operation !== 'C'){
            //Mudar operação
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation)
            }
            return
        }


        //Pegando valores atuais e anteriores
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0]
        const current = +this.currentOperationText.innerText

        switch(operation){
            case '+':
                operationValue = previous + current
                this.updateScreen(operationValue, operation, previous, current)
                break
            case '-':
                operationValue = previous - current
                this.updateScreen(operationValue, operation, previous, current)
                break
            case '/':
                operationValue = previous / current
                this.updateScreen(operationValue, operation, previous, current)
                break
            case '*':
                operationValue = previous * current
                this.updateScreen(operationValue, operation, previous, current)
                break
            case 'DEL':
                this.processDelOperator()
                break
            case 'CE':
                this.processClearCurrentOperation()
                break
            case 'C':
                this.processClearAllOperation()
                break
            case '=':
                this.processEqualOperation()
                break
            default:
                return
        }
    }

    //Mudando valores na tela da calculadora
    updateScreen(operationValue = null, operation = null, current = null, previous = null){

        console.log(operationValue, operation, previous, current);

        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation
        } else {
            //Checando se o valor é zero, se estiver assim, adiciona o valor atual
            if(previous === 0){
                operationValue = current
            }

            //Adicionar valor atual para o anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
        
    }

    // Mudando operações matemáticas
    changeOperation(operation){

        const mathOperations = ['*', '/', '+', '-']
        if(!mathOperations.includes(operation)){
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    //Remover o último dígito da calculadora
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    //Limpando a operação atual
    processClearCurrentOperation(){
        this.currentOperationText.innerText = ""
    }

    //Limpando toda a operação
    processClearAllOperation(){
        this.previousOperationText.innerText = ""
        this.currentOperationText.innerText = ""
    }

    //Processando a operação
    processEqualOperation(){
        const operation = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation)
    }
}

//Instanciando o objeto com suas propriedades
const calculadora = new Calcutalor (previousOperationText, currentOperationText)

//Lógica de clique do botão e obtenção do seu valor ou ação
buttons.forEach((btn) =>{
    btn.addEventListener('click', (e) =>{
        const value = e.target.innerText

        if(+value >= 0 || value === '.'){
            calculadora.addDigit(value);
        } else {
            calculadora.processOperation(value)
        }
    })
})