var submitButton = document.querySelector('#app form button')
var resetButton = document.querySelector('form #clear')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)
resetButton.addEventListener('click', clear)

function run (event){
    event.preventDefault()

    /* --- VALIDANDO O CEP ---*/
    var zipCode = zipCodeField.value

    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()

    axios.get('https://viacep.com.br/ws/'+ zipCode + '/json/')
    .then(function (response){
        if (response.data.error) {
            throw new Error('CEP inválido')
        }

        content.innerHTML = ''
        createLine('Logradouro: '+ response.data.logradouro)
        createLine('Bairro: ' + response.data.bairro)
        createLine('Localidade: ' + response.data.localidade + '/' + response.data.uf)
        createLine('DDD: ' + response.data.ddd)
    })
    .catch(function (error){
        console.log(error)
        content.innerHTML = ''
        createLine('Ops, algo deu errado!')
    })
}

function createLine(text){
    var line = document.createElement('p')
    var text = document.createTextNode(text)
    line.appendChild(text)
    content.appendChild(line)
}

function clear(clean){
    clean.preventDefault()
    content.innerHTML = ''
}