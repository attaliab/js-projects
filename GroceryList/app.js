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

// *** EVENT LISTENERS ***
// Submit form
form.addEventListener("submit", addItem);

// Clear list
clearBtn.addEventListener('click', clearItems)


// *** FUNCTIONS ***
function addItem(e) {
    e.preventDefault();
    const value = input.value
    // CHALLENGE: write code to generate a real ID that increments with a new item
    const id = new Date().getTime().toString()
    if (value && !editFlag){
        const element = document.createElement('article');
        //add class
        element.classList.add('grocery-item');
        //add id
        const attribute = document.createAttribute('data');
        attribute.vlaue = id;
        element.setAttributeNode(attribute);
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
        //display alert
        displayAlert('Item successfully added', 'success')
        //show alert because it is currently hidden
        container.classList.add('show-container')
        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        function setBackToDefault() {
            grocery.value = '';
            editFlag = false;
            editID = '';
            submitBtn.textContent = 'submit';
        };
    } else if (value && editFlag){
        console.log('editing')
    } else {
        displayAlert('Please enter value', 'danger')
    }
};

// display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //remove alert after set time
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000)
}
// clear items
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
    // localStorage.removeItem('list');
}

// delete function
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
    // removeFromLocalStorage(id);
}
// edit function
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


//set back to default
function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
};
// local storage
function addToLocalStorage(id, value) {
    console.log('added to local storage');
}

function removeFromLocalStorage(id) {

}
