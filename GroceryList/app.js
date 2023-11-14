const alert = document.querySelector('.alert')
const container = document.querySelector('.grocery-container')
const form = document.querySelector('.grocery-form')
const listItem = document.querySelector('.title')
const submitBtn = document.getElementById('submit-btn')
const list = document.querySelector('.grocery-list')
const clearBtn = document.getElementById('clear-btn')
const input = document.getElementById('grocery')


let editeElement;
let editFlag = false;
let editID = "";

// *** EVENT LISTENERS ****************************************************
// SUBMIT FORM *********************
form.addEventListener("submit", addItem);

// CLEAR LIST ************************
clearBtn.addEventListener('click', clearItems)

// LOAD ITEMS
window.addEventListener('DOMContentLoaded', setupItems());


// *** FUNCTIONS *********************************************************
// ADD ITEMS *******************
function addItem(e) {
    e.preventDefault();
    const value = input.value
    // CHALLENGE: write code to generate a real ID that increments with a new item
    const id = new Date().getTime().toString()
    if (value !== "" && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <span class="material-icons">
                    create
                    </span>

                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <span class="material-icons">
                    delete
                    </span>
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
        // add event listeners to both buttons;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);
    
        // append child
        list.appendChild(element);
        // display alert
        displayAlert("item added to the list", "success");
        // show container
        container.classList.add("show-container");
        // set local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();
    } else if (value!== '' && editFlag){
        editElement.innerHTML = value;
        displayAlert('value changed', 'success');
        // edit local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert('Please enter value', 'danger')
    }
    setBackToDefault();
};

// DISPLAY ALERT *****************
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //remove alert after set time
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000)
};

// CLEAR ITEMS *********************
function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0) {
        items.forEach(function(item){
            list.removeChild(item)
        })
    }
    container.classList.remove('show-container')
    displayAlert('empty list', 'danger');
    setBackToDefault();
    localStorage.removeItem('list');
}

// DELETE ITEM ************************
function deleteItem(e) {
    // trying to access grocery-item
    // currentTarget is the button
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0) {
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
}
// EDIT ITEM **************************
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    //set edit item
    // trying to access .title from button element... here, currentTarget = button element
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set form input to the value of what is being edited
    input.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'Edit';
}


// SET BACK TO DEFAULT ********************
function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
};
// LOCAL STORAGE *************************
function addToLocalStorage(id, value) {
    // * INFO: {id:id, value:value} gets simplified to {id, value} *
    const grocery = {id,value}
    let items = getLocalStorage();
    //CHANGED FROM... let items = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
    items.push(grocery);
    // console.log('added to local storage');
    localStorage.setItem('list', JSON.stringify(items));
    console.log(items)
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(function(item) {
        if (item.id !== id) {
            console.log(item)
            return item;
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function(item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list',  JSON.stringify(items));
}

// localStorage API
// setItem
// getItem
// removeItem
// save as strings

// localStorage.setItem('oranges', JSON.stringify(['item', 'item 2']));
// const oranges = JSON.parse(localStorage.getItem('oranges'));
// console.log(oranges)

// SETUP ITEMS
function setupItems(){
    let items = getLocalStorage();
    if (items.length > 0){
        item.forEach(function(item){
            createListItem(item.id, item.value)
        })
        container.classList.add('show-container')
    }
}

function createListItem(id, value){
        const element = document.createElement('article');
        //add id
        const attribute = document.createAttribute('data');
        attribute.value = id;
        element.setAttributeNode(attribute);
        // add class
        element.classList.add('grocery-item');
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <span class="material-icons">
                    create
                    </span>

                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <span class="material-icons">
                    delete
                    </span>
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
        // Edit & Delete buttons
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);

        //append child
        list.appendChild(element);
    }

    function getLocalStorage() {
        return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
    }