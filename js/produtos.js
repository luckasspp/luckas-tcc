//CARROSSEL
const Carrossel = () => {

    var i = 1
    show()
    function show(){
        var slides = document.querySelectorAll('.carrossel .modeloProduto')
        if(i > slides.length){i = 1}
        for(j = 0; j < slides.length; j++){slides[j].style.display = 'none'}
        slides[i-1].style.display = 'flex'
        i++
        setTimeout(show,1000)
    }
}
Carrossel()
///CARROSSEL


var url = decodeURI(window.location.search)
var primeiro = (url.indexOf('=')+1)
var ultimo = url.length
var categoria = url.slice(primeiro, ultimo)

const pegaBanco = (categoria) => {
    var apendados = document.querySelectorAll('.container-4 .row-2 div')
    apendados.forEach(produto => {produto.remove()})

    fetch(`../php/categorias.php?nome=${categoria}`,{
        method:'get'
    })
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        data.forEach(produto =>{
            var modelo = document.querySelector('.modeloProduto').cloneNode(true)
            modelo.setAttribute('data-key',produto.ID_PRODUTO)
            modelo.querySelector('.nome').innerHTML = produto.NOME_PRODUTO
            modelo.querySelector('.imagem').src = produto.SRC_PRODUTO
            modelo.querySelector('.descricao').innerHTML = produto.DESC_PRODUTO
            modelo.querySelector('.preco').innerHTML = produto.PRECO_PRODUTO
            modelo.onclick = function(){
                abrirModal()
                completaModal(this,data)
            }
            document.querySelector('.container-4 .row-2').append(modelo)
        })
    })
}
pegaBanco(categoria)

var categorias = document.querySelectorAll('.container-4 .row-1 div')
categorias.forEach(categoria => {
    categoria.onclick = () => pegaBanco(categoria.querySelector('p').innerHTML)
})

const abrirModal = () => {
    document.querySelector('.fundoModal').style.display = 'flex'
    document.querySelector('.fundoModal').style.opacity = 1
    document.querySelector('.modal').style.opacity = 0
    document.querySelector('.modal').style.display = 'flex'
    setTimeout(()=>document.querySelector('.modal').style.opacity = 1 , 150)
    document.querySelector('.fundoModal .fechar').onclick = () => fecharFundoModal()
}

const completaModal = (modelo,data) =>{
    var modal = document.querySelector('.modal').cloneNode(true)
    modal.setAttribute('data-key',modelo.dataset.key)
    modal.querySelector('.imagem').src = modelo.querySelector('.imagem').src
    modal.querySelector('.nome').innerHTML = modelo.querySelector('.nome').innerHTML
    modal.querySelector('.preco').innerHTML = modelo.querySelector('.preco').innerHTML
    modal.querySelector('.subtotal').innerHTML = modelo.querySelector('.preco').innerHTML
    modal.querySelector('.descricao').innerHTML = modelo.querySelector('.descricao').innerHTML
    modal.querySelector('.quantidade').innerHTML = 1
    document.querySelector('.fundoModal').append(modal)
    document.querySelector('.modal').remove()

    modal.querySelector('.btnMenos').onclick = () => clickBtnMenos(modal,data)
    modal.querySelector('.btnMais').onclick = () => clickBtnMais(modal,data)
    modal.querySelector('.btnAdd').onclick = () => clickBtnAdd(modal,data)
}

const clickBtnMenos = (modal,data) => {
    let x = parseInt(modal.querySelector('.quantidade').innerHTML)
    if(x > 1)
    {
        x -= 1
        modal.querySelector('.quantidade').innerHTML = x
        atualizaSubtotal(modal,data)
        atualizaTotal()
    }
}

const clickBtnMais = (modal,data) => {
    let x = parseInt(modal.querySelector('.quantidade').innerHTML)

    x += 1

    modal.querySelector('.quantidade').innerHTML = x
    atualizaSubtotal(modal,data)
    atualizaTotal()
}

const fecharFundoModal = () => {
    setTimeout(() => document.querySelector('.fundoModal').style.opacity = 0,500)
    document.querySelector('.fundoModal').style.display = 'none'
}

const atualizaSubtotal = (modal, data) => {
    let x = data[modal.dataset.key - 1].PRECO_PRODUTO
    let y = parseInt(modal.querySelector('.quantidade').innerHTML)

    modal.querySelector('.subtotal').innerHTML = (x*y).toFixed(2)
}

const clickBtnAdd = (modal,data) => {
    fecharFundoModal()
    abrirFundoCarrinho()

    var aux = false
    var itensCarrinho = document.querySelectorAll('.carrinho')
    itensCarrinho.forEach(item => {
        if(item.dataset.key == modal.dataset.key && item.querySelector('.imagem').src == modal.querySelector('.imagem').src)
        {
            atualizaItem(modal,data)
            aux = true
        }
    })
    if(aux == false)
    {
        appendaItem(modal,data)

    }
    document.querySelector('#fazerPedido').onclick = () => fazerPedido()
}

const appendaItem = (modal,data) => {
    document.querySelector('.carrinho').style.display = 'flex'
    var carrinho = document.querySelector('.carrinho').cloneNode(true)
    document.querySelector('.carrinho').style.display = 'none'

    carrinho.setAttribute('data-key',modal.dataset.key)
    carrinho.querySelector('.imagem').src = modal.querySelector('.imagem').src
    carrinho.querySelector('.subtotal').innerHTML = modal.querySelector('.subtotal').innerHTML
    carrinho.querySelector('.quantidade').innerHTML = modal.querySelector('.quantidade').innerHTML

    document.querySelector('.fundoCarrinho').append(carrinho)
    atualizaTotal()

    carrinho.querySelector('.btnMenos').onclick = () => clickBtnMenos(carrinho,data)
    carrinho.querySelector('.btnMais').onclick = () => clickBtnMais(carrinho,data)  
}

const abrirFundoCarrinho = () => {
    document.querySelector('.fundoCarrinho').style.width = '30%'
    document.querySelector('.fundoCarrinho .fechar').onclick = () => document.querySelector('.fundoCarrinho').style.width = '0'
}

const atualizaItem = (modal,data) => {
    let itensCarrinho = document.querySelectorAll('.carrinho')
    itensCarrinho.forEach(item =>{
        if(item.dataset.key == modal.dataset.key)
        {
            var x = parseInt(modal.querySelector('.quantidade').innerHTML)
            var y = parseInt(item.querySelector('.quantidade').innerHTML)

            item.querySelector('.quantidade').innerHTML = x+y
            atualizaSubtotal(item,data)
            atualizaTotal()
        }
    })
}

const atualizaTotal = () => {
    var total = 0
    var itensCarrinho = document.querySelectorAll('.carrinho')
    itensCarrinho.forEach(item => {
        var x = parseFloat(item.querySelector('.subtotal').innerHTML)
        if(Number.isNaN(x) == false)
        {
            total += parseFloat(item.querySelector('.subtotal').innerHTML)
        }
        document.querySelector('.total').innerHTML = total.toFixed(2)
    })

    var arr = []
    for(x of itensCarrinho){
        var compra = {
            datakey : x.dataset.key,
            imagem : x.querySelector('.imagem').src,
            subtotal : x.querySelector('.subtotal').innerHTML,
            quantidade: x.querySelector('.quantidade').innerHTML
        }
        arr.push(compra)
    }
    localStorage.setItem('itens',JSON.stringify(arr))
}

const fazerPedido = () => {
    document.querySelector('.fundoCadastro').style.display = 'flex'
    clickBtnFecharCadastro()
    clickBtnContinuar()
}

const clickBtnFecharCadastro = () => {
    var fechar = document.forms['formCadastro']['fechar']

    fechar.onclick = () => document.querySelector('.fundoCadastro').style.display = 'none'
}

const clickBtnContinuar = () => {
    document.querySelector('#continuar').addEventListener('click',(e)=>{
        e.preventDefault()
        var cliente = {email: document.querySelector('#email').value,
                       senha: document.querySelector('#senha').vlaue,
                       nome: document.querySelector('#nome').value,
                       cpf: document.querySelector('#cpf').value,
                       telefone: document.querySelector('#telefone').value,
                       dataNasc: document.querySelector('#dataNasc').value}

        localStorage.setItem('cliente',JSON.stringify(cliente))       
        
        var form = document.querySelector('#formCadastro')
        var formData = new FormData(form)

        fetch('../php/cadastro.php',{
            method:'POST',
            body:formData
        })
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            console.log(data)
            document.querySelector('.fundoCadastro').style.display = 'none'
            abrirFundoLogin()
        })
    })
}

const abrirFundoLogin = () => {
    document.querySelector('.fundoLogin').style.display = 'flex'
    var fecharLogin = document.forms['formLogin']['fechar']
    fecharLogin.onclick = () => document.querySelector('.fundoLogin').style.display = 'none'

    clickBtnLogarLogin()
}

const clickBtnLogarLogin = () => {
    document.querySelector('#logar').addEventListener('click',(e)=>{
        e.preventDefault()
        var form = document.querySelector('#formLogin')
        var formData = new FormData(form)

        fetch('../php/logar.php',{
            method:'POST',
            body:formData
        })
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            console.log(data)
            if(data == 'Logado!!')
            {
                console.log('parti prox')
                document.querySelector('.fundoLogin').style.display = 'none'
                abrirFormaDePagamento()
            }
            else
            {
                console.log('Falhou')
            }
        })
    })
}

const abrirFormaDePagamento = () => {
        document.querySelector('fundoFormaPagamento').style.display = 'flex'
        document.querySelector('#efetuar').addEventListener('click',(e)=>{
            e.preventDefault()
            var form = document.querySelector('#formPagamento')
            var formData = new FormData(form)

            fetch('../php/formaPagamento.php',{
                method:'POST',
                body:formData
            })
            .then((response)=>{
                return response.json()
            })
            .then((data)=>{
                console.log(data)
                document.querySelector('#p-pagamento').append("Compra Efetivada!")
            })
        })
}

document.querySelector('.container-1 input').addEventListener('keypress',(e)=>{
    if(e.key == 'Enter')
    {
        pegaBanco(document.querySelector('.container-1 input').value)
    }
})

document.querySelector('.container-1 .item-1').onclick = () => window.open(`http://aquecimento/index.html`,'_self')

document.querySelector('.container-1 .item-3').onclick = () =>window.open(`http://aquecimento/areaCliente.html`,'_self')
