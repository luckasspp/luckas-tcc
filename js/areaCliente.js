var cliente = JSON.parse(localStorage.getItem('cliente'))

document.querySelector('.nome').innerHTML = cliente.nome

document.querySelectorAll('.colu-1 p').forEach( p => {
    p.onclick = function(){
        if(this.innerHTML == 'Dados Pessoais')dadosPessoais()
        if(this.innerHTML == 'Meus Pedidos')meusPedidos()
        
    }
})

const dadosPessoais = () => {
    document.querySelectorAll('.colu-2 div').forEach( x => {x.remove()})

    var cliente = JSON.parse(localStorage.getItem('cliente'))

    var modelo = document.querySelector('.modeloCadastro').cloneNode(true)

    modelo.querySelector('.nome').innerHTML = cliente.nome
    modelo.querySelector('.dataNasc').innerHTML = cliente.dataNasc
    modelo.querySelector('.cpf').innerHTML = cliente.cpf
    modelo.querySelector('.email').innerHTML = cliente.email
    modelo.querySelector('.celular').innerHTML = cliente.telefone

    document.querySelector('.colu-2').append(modelo)
}

const meusPedidos = () => {
    document.querySelectorAll('.colu-2 div').forEach( x =>{x.remove()})

    var itens = JSON.parse(localStorage.getItem('itens'))
    itens.shift()

    var qtdPedidos = 1 

    for(i = 0; i < qtdPedidos; i++)
    {
        document.querySelector('.pedido').style.display = 'block'

        var modelo = document.querySelector('.pedido').cloneNode(true)
        modelo.querySelector('.accordion').innerHTML = 'Pedido' + (i+1)
        
        itens.forEach( item => {
            var mod = document.querySelector('.modeloItems').cloneNode(true)
            mod.setAttribute('data-key',item.datakey)
            mod.querySelector('.imagem').src = item.imagem
            mod.querySelector('.quantidade').innerHTML = item.quantidade
            mod.querySelector('.subtotal').innerHTML = item.subtotal

            modelo.querySelector('.panel').append(mod)
            document.querySelector('.pedido').style.display = 'none'
        })
        document.querySelector('.colu-2').append(modelo)
    }
    var acc = document.getElementsByClassName('accordion')
    var i

    for(i = 0; i < acc.length; i++)
    {
        acc[i].addEventListener('click',function(){
            this.classList.toggle('active')
            var panel = this.nextElementSibling
            if(panel.style.display == 'flex')
            {
                panel.style.display = 'none'
            }
            else 
            {
                panel.style.display = 'flex'
            }
        })
    }
}
document.querySelector('.container-1 .item-1').onclick = () => window.open(`http://aquecimento/index.html`,'_self')
