const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const duty = document.querySelector('#duty');
let items;


loadItems();


eventListeners();

function eventListeners() {

    form.addEventListener('submit', addNewItem);


    duty.addEventListener('click', deleteItem);


    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {
    items = getItemsFromLS();
    items.forEach(function(item) {
        createItem(item);
    });
}

function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}


function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function(item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}


function createItem(text) {

    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));
    li.style.backgroundColor = "transparent";
    li.style.color = "white";
    li.style.fontWeight = "normal";
    li.style.textDecoration = "underline";
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';
    a.style.color = "red";



    li.appendChild(a);

    duty.appendChild(li);

}


function addNewItem(e) {
    if (input.value === '') {
        alert('add new item');
    }


    createItem(input.value);


    setItemToLS(input.value);


    input.value = '';

    e.preventDefault();

}


function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        if (confirm('Emin Misiniz?')) {
            e.target.parentElement.parentElement.remove();


            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}


function deleteAllItems(e) {

    if (confirm('Emin Misiniz?')) {
        // duty.innerHTML='';
        while (duty.firstChild) {
            duty.removeChild(duty.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}