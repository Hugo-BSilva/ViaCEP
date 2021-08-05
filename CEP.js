var submitButton = document.querySelector('#app form button')
var resetButton = document.querySelector('form #clear')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)
resetButton.addEventListener('click', clear)

function run (event){
    //Previne o comportamento padrão, não deixa a página atualizar sozinha 
    event.preventDefault()

    /* --- VALIDANDO O CEP ---*/
    var zipCode = zipCodeField.value

    /*Substitui um espaço em branco caso o usuário digite(ou ponto), por nada 
      e remove os espaçamentos no início e no fim*/
    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()

    //Faz a requisição para a API
    axios.get('https://viacep.com.br/ws/'+ zipCode + '/json/')
    .then(function (response){
        //Se existir a propriedade error
        if (response.data.error) {
            throw new Error('CEP inválido')
        }

        //Limpa o conteúdo, antes de preencher
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
    //Mostra para o usuário o nome da rua segundo o CEP
    var line = document.createElement('p')
    var text = document.createTextNode(text)
    line.appendChild(text)
    content.appendChild(line)
}

function clear(clean){
    clean.preventDefault()
    content.innerHTML = ''
}