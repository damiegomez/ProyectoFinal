
const productsContainer = document.getElementById('productsContainer');
const Seeproducts = document.getElementById('btnSeeProducts')
const cartContainer = document.getElementById('cartContainer');
const btnEmptyCart = document.getElementById('emptyCart');
const totalPrice = document.getElementById('totalPrice');
const checkout = document.getElementById('checkout');

let gondola = [];
let cart = [];
let amount = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCart();
    }
})

Seeproducts.onclick = async() => {

    const infoCatalogue = await fetch('./catalogue.json')
    const infoCatalogueJson = await infoCatalogue.json()
    await infoCatalogueJson.forEach(e => {
        gondola.push(e)
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
            addToCart(product); 
           
        })  
        
        btnRemove.addEventListener('click', () => {
            removeItem(product);
        })
        
    })

    }   

    const addToCart = (prodId) => {
        console.log(prodId)
        const productFound = cart.find((prod) => prod.id === prodId);
        console.log(productFound)
        
        const checkCart = cart.find((prod) => prod.id === prodId);

        if(productFound && checkCart){
            
            
            prodId.innerHTML = amount++;

        } else {
            cart.push(prodId);
            console.log(cart)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado con éxito',
                showConfirmButton: false,
                timer: 1500
                })
        }
        updateCart();
    }
       
    const removeItem = (productId) => {
                
                let item = cart.find((prod) => prod.id === productId);
                const index = cart.indexOf(item)
                cart.splice(index,1)
                updateCart();
                
            }
    

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
          totalPrice.innerHTML = 0;
            cart.length = 0;
        }
         updateCart();
      })

    
       
})

const updateCart = () => {

    cartContainer.innerHTML = "";

    cart.forEach((prod)=> {

        const div = document.createElement('div')
        div.innerHTML = `
        <p>${prod.name}</p>
        <p>Precio: $${prod.price}</p>
        <p>Cantidad: <span id="amount">${prod.amount}</span></p>
        <!-- <button onclick = "removeFromCart(${prod.id})" class ="btnDelete">Eliminar<i class="fas fa-trash-alt"</button> -->
        `

        cartContainer.appendChild(div);
        localStorage.setItem('cart', JSON.stringify(cart));

        totalPrice.innerHTML = cart.reduce((acc,prod) => acc + prod.price * prod.amount, 0);
        
    })

}

 checkout.onclick = () => {

    Swal.fire(`El total a pagar es de $${totalPrice}. Muchas gracias por su compra!`);
}


