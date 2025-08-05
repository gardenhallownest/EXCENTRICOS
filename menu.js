const carrinho = [];
const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');

// Atualiza a lista e o total do carrinho
function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';
  let total = 0;
  carrinho.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$${item.preco.toFixed(2)} x${item.quantidade}`;
    // Botão remover
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.style.marginLeft = '1rem';
    btnRemover.onclick = () => {
      if (item.quantidade > 1) {
        item.quantidade -= 1;
      } else {
        carrinho.splice(index, 1);
      }
      atualizarCarrinho();
    };
    li.appendChild(btnRemover);
    listaCarrinho.appendChild(li);
    total += item.preco * item.quantidade;
  });
  totalCarrinho.textContent = `Total: R$${total.toFixed(2)}`;
}

// Adiciona evento aos botões
document.querySelectorAll('.card-produto').forEach(card => {
  card.querySelector('.btn-carrinho').addEventListener('click', () => {
    const nome = card.querySelector('h2').textContent;
    const preco = parseFloat(card.querySelector('p').textContent.replace('R$', '').replace(',', '.'));
    let produto = carrinho.find(item => item.nome === nome);
    if (produto) {
      produto.quantidade += 1;
    } else {
      carrinho.push({ nome, preco, quantidade: 1 });
    }
    atualizarCarrinho();
  });
});