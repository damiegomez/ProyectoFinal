
const productsContainer = document.getElementById('productsContainer');
const SeeProducts = document.getElementById('btnSeeProducts')
const cartContainer = document.getElementById('cartContainer');
const btnEmptyCart = document.getElementById('emptyCart');
const totalPrice = document.getElementById('totalPrice');
const checkout = document.getElementById('checkout');

let cart = [];
let productInCart = [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCart();
    }
})

SeeProducts.onclick = async() => {

    const infoCatalogue = await fetch('./catalogue.json')
    const infoCatalogueJson = await infoCatalogue.json()
    await infoCatalogueJson.forEach(e => {
        cart.push(e)
        console.log(e)
    })
    
    infoCatalogueJson.map((product) =>{
        const div = document.createElement('div')
        div.innerHTML = `
        <h1>${product.name}</h1>
        <p>$${product.price}</p>
        <button id="add${product.id}"> Agregar </button>
        <button id="remove${product.id}"> Eliminar</button>
        <hr>
        `
        productsContainer.appendChild(div);

        const btnAdd = document.getElementById(`add${product.id}`)
        const btnRemove = document.getElementById(`remove${product.id}`)

        console.log(product.id);
        btnAdd.addEventListener('click', () => {
            addToCart();
        })        
        
    })

    }   

    const addToCart = (prodId) => {

        infoCatalogueJson.find((prod) => prod.id === prodId);
           
    }
       /*
            btnRemove.onclick = (prodId) =>{
                
                    let item = cart.find((prod) => prod.id === prodId);
                    const index = cart.indexOf(item)
                    cart.splice(index,1)
                    updateCart();
                
            }
    */

btnEmptyCart.addEventListener('click', () => {
    Swal.fire({
        title: 'Estas seguro de vaciar carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar carrito!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Carrito vaciado con exito!"
          )
        }
      })

    cart.length = 0;
    updateCart();
})

const updateCart = () => {

    cartContainer.innerHTML = "";

    cart.forEach((prod)=> {

        const div = document.createElement('div')
        div.innerHTML = `
        <p>${prod.name}</p>
        <p>Precio: $${prod.price}</p>
        <p>Cantidad: <span id="amount">${prod.amount}</span></p>
        <button onclick = "removeFromCart(${prod.id})" class ="btnDelete">Eliminar<i class="fas fa-trash-alt"</button>
        `

        cartContainer.appendChild(div);
        localStorage.setItem('cart', JSON.stringify(cart));

        totalPrice.innerHTML = cart.reduce((acc,prod) => acc + prod.price * prod.amount, 0);
        
    })

}

 checkout.onclick = () => {

    Swal.fire("Gracias por su compra, hasta luego")
}


