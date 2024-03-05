const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(item => addItemToDOM(item));
  checkUI();
};

const onAddItemSubmit = e => {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = '';
};

const addItemToDOM = item => {
  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
};

const createButton = classes => {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
};

const createIcon = classes => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
};

const addItemToStorage = item => {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = () => {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
};

const removeItem = e => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure ?')) {
      e.target.parentElement.parentElement.remove();

      checkUI();
    }
  }
};

const clearItems = () => {
  // itemList.innerHTML = ''; // Simple way of clearing all dom elements

  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
};

const filterItems = e => {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLocaleLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

const checkUI = () => {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
};

// Initialize app

const init = () => {
  // Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', removeItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
};

init();
