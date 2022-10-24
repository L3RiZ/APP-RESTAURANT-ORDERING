import { menuArray } from '/data.js'

let order = []
let foodNames = []

const orderForm = document.getElementById('order-form');
const completedOrder = document.getElementById('completed-order')

document.addEventListener('click', function(e){
    if(e.target.dataset.btn){
       addToOrder(e.target.dataset.btn) 
    } else if(e.target.dataset.plus) {
        addToOrder(e.target.dataset.plus)
    } else if(e.target.dataset.counter) {
        removeFromOrder(e.target.dataset.counter)
    } else if(e.target.id === 'order-button') {
        openForm();
    }
})


function addToOrder(btnId) {
    const targetArrayObj = menuArray.filter(function(food){
        return food.uuid === btnId
    })[0]
    
    order.push(targetArrayObj)
    foodNames.push(targetArrayObj.name)
    
    showOrder();
}

function removeFromOrder(btnId) {
    order.splice(btnId -= 1, 1);
    foodNames.splice(btnId, 1);

    showOrder();
}

function openForm(){
    document.getElementById('form-cnt').classList.remove('hidden');
}

function showOrder() {
    completedOrder.classList.add('hidden')
    
  const orderMenu = document.getElementById('your-order')  
    if(order.length > 0) {
    orderMenu.classList.remove('hidden');
    
    let orderList = ''
    let total = 0
    let btnCounter = 0;
    order.forEach(function(point) {
       orderList += `
       <div class="products-cnt">
        <div class="order-product">
            <p class="food-list">${point.name}</p>
            <button class="remove-btn" data-counter="${btnCounter +=1}">remove</button>
        </div>
        <div>
            <p class="price-low">$${point.price}</p>
        </div>
       </div>
       `  
       
       total += point.price
    })
    
    let mealDealHidden = 'hidden'
    
       if (foodNames.includes('Hamburger') && foodNames.includes('Beer') || 
    foodNames.includes('Pizza') && foodNames.includes('Beer')) {
        total *= 0.5
        mealDealHidden = ''
    } else {
        mealDealHidden = 'hidden'
    }
    
    orderMenu.innerHTML = `
    <h3>Your Order</h3>
    ${orderList}
     <div class="sum-cnt">
        <div class="total-price">
            <p class="total-text">Total price:</p>
            <p class="meal-deal ${mealDealHidden}" id="meal-deal">!!! MEAL DEAL DISCOUNT !!!</p>
        </div>
        <div>
            <p class="price-low">$${total}</p>
        </div>
       </div>
       <button class="order-button" id="order-button">Complete order</button>
    `
    
 } else {
     orderMenu.classList.add('hidden');
 }
}

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    document.getElementById('form-cnt').classList.add('hidden');
    
    const formData = new FormData(orderForm);
    const fullName = formData.get('name')
    
    completeOrder(fullName)
})

function completeOrder(name) {
    order = []
    showOrder()
    
    completedOrder.classList.remove('hidden')
    completedOrder.innerHTML =`<p class="confirmation-text">
    Thanks, ${name}! Your order is on its way!<p>`
}

function generateMenu() {
    let menuHtml = ''
    
    menuArray.forEach(function(food) {
        menuHtml += `
        <div class="menu-points">
            <div class="food-emoji-cnt">
                 <p class="food-emoji">${food.emoji}</p> 
            </div>
            <div class="menu-text">
                <h2>${food.name}</h2>
                 <p class="light">${food.ingredients}</p>
                 <p class="bold">$${food.price}</p>
            </div>
            <div class="button-cnt">
                <button class="add-to-list" data-btn="${food.uuid}">
                    <span class="plus" data-plus="${food.uuid}">+</span>
                </button>
            </div>
        </div>`
    })
    
    return menuHtml
}

function render() {
    document.getElementById('menu').innerHTML = generateMenu();
}

render();