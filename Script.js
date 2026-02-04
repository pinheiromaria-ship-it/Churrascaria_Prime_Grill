// Objeto para armazenar os itens do carrinho
let cart = {};

// Função para iniciar o app (esconder splash)
function startApp() {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

// Aumentar quantidade
function increaseQuantity(name, price) {
    let qtyElement = document.getElementById(`qty-${name}`);
    let qty = parseInt(qtyElement.textContent);
    qty += 1;
    qtyElement.textContent = qty;
    cart[name] = { price: price, quantity: qty };
    updateCart();
}

// Diminuir quantidade
function decreaseQuantity(name, price) {
    let qtyElement = document.getElementById(`qty-${name}`);
    let qty = parseInt(qtyElement.textContent);
    if(qty > 0) qty -= 1;
    qtyElement.textContent = qty;
    if(qty === 0) {
        delete cart[name];
    } else {
        cart[name] = { price: price, quantity: qty };
    }
    updateCart();
}

// Adicionar 1 unidade ao carrinho via botão "Adicionar"
function addToCart(name, price) {
    let qtyElement = document.getElementById(`qty-${name}`);
    let qty = parseInt(qtyElement.textContent);
    qty += 1; // adiciona 1 unidade
    qtyElement.textContent = qty;
    cart[name] = { price: price, quantity: qty };
    updateCart();
}

// Atualizar lista do carrinho e total
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let total = 0;

    for (let item in cart) {
        const li = document.createElement('li');
        li.textContent = `${item} x${cart[item].quantity} - R$ ${(cart[item].price * cart[item].quantity).toFixed(2)}`;
        cartItems.appendChild(li);
        total += cart[item].price * cart[item].quantity;
    }

    document.getElementById('total').textContent = total.toFixed(2);
}

// Finalizar pedido (exemplo simples)
function finalizeOrder() {
    if(Object.keys(cart).length === 0){
        alert('Seu carrinho está vazio!');
        return;
    }

    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;
    const coupon = document.getElementById('coupon').value;

    let message = "Pedido finalizado!\n\nItens:\n";
    for(let item in cart){
        message += `${item} x${cart[item].quantity}\n`;
    }
    message += `\nTotal: R$ ${document.getElementById('total').textContent}`;
    message += `\nEndereço: ${address}`;
    message += `\nPagamento: ${payment}`;
    if(coupon) message += `\nCupom: ${coupon}`;

    alert(message);

    // Limpar carrinho após finalizar
    cart = {};
    document.querySelectorAll('.quantity').forEach(q => q.textContent = '0');
    updateCart();
}
