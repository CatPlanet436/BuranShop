document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[name="tag"]');
    const cards = document.querySelectorAll('.product-card');

    function filterCards() {
        const checkedTags = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        cards.forEach(card => {
            const tags = card.dataset.tags.split(',');

            if (checkedTags.length === 0) {
                card.style.display = 'block';
                return;
            }

            const matches = checkedTags.some(tag => tags.includes(tag));
            card.style.display = matches ? 'block' : 'none';
        });
    }

    checkboxes.forEach(cb => cb.addEventListener('change', filterCards));
});

let cartCount = 0;

document.querySelector('.cart-count').textContent = cartCount;

const cart = new Set();
function toggleCart(button) {
    const card = button.closest('.product-card');
    const productId = card.id;
    const cartItemsContainer = document.querySelector('.cart__items')

    if (cart.has(productId)) {
        cart.delete(productId);
        button.classList.remove('in-cart');
        button.textContent = 'Купить!';
        removeFromCart(productId);

        cartCount--;
        document.querySelector('.cart-count').textContent = cartCount;
    } else {
        cart.add(productId);
        button.classList.add('in-cart');
        button.textContent = 'В корзине';
        addToCart(card.cloneNode(true));

        cartCount++;
        document.querySelector('.cart-count').textContent = cartCount;
    }
}

function addToCart(cardClone) {
    const cartItemsContainer = document.querySelector('.cart__items');
    const buyButton = cardClone.querySelector('button');
    if (buyButton) {
        buyButton.remove();
    }
    cartItemsContainer.appendChild(cardClone);
}

function removeFromCart(productId) {
    const cartItemsContainer = document.querySelector('.cart__items');
    const itemToRemove = cartItemsContainer.querySelector(`#${productId}`);
    if (itemToRemove) {
        cartItemsContainer.removeChild(itemToRemove);
    }
}

function openCart() {
    document.getElementById('main-block').classList.toggle('transparent');
    document.getElementById('cart-block').classList.toggle('transparent');
}