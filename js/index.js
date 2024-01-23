document.querySelector('.container-1 .item-5').onclick = () =>
{    
    
    document.querySelector('.container-3').style.display = 'flex'
    var categorias = document.querySelectorAll('.container-3 div')
    categorias.forEach(categoria=>{
    categoria.onclick = () => {window.open(`http://aquecimento/produtos.html?nome=${categoria.querySelector('p').innerHTML}`,'_self')}
    })
}