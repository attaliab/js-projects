const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const listItem = document.querySelector('.title')
const submitBtn = document.getElementById('submit-btn')
const list = document.querySelector('groceryList')
const clearBtn = document.getElementById('clear-btn')
const input = document.getElementById('item-input')


let editeElement;
let editFlag = false;
let editID = "";



form.addEventListener('submit', addItem);
function addItem(e) {
    const inputValue = document.getElementById('item-input').value
    e.preventDefault();
    console.log(inputValue)
};


// submitBtn.addEventListener('click', function() {
//     const inputValue = document.getElementById('item-input').value
//     listItem.innerHTML += inputValue;
//     console.log(inputValue)
// });