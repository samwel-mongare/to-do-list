const todaysList = document.getElementById('todays-list');
const newTaskForm = document.querySelector('#input-container');
const newTaskInput = document.querySelector('#task-input');
const clearCompleteTaskButton = document.querySelector('#task-completed');

const LOCAL_STORAGE_LIST_KEY = 'tasks.list';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

function createList() {
  lists.forEach((list) => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-name');
    listElement.innerHTML = `
        <form class= "listy" id="listy" autocomplete="on">
        <input type="checkbox" id=${list.id} name="task1" class="work"  ${list.completed ? 'checked' : ''}>
        <textarea class="labely" id=${list.id}>${list.description}</textarea>
        </form>
        <i class="fa fa-trash-o" aria-hidden="true" id="sams"></i>
            <span>&#8942;</span>
        `;
    todaysList.appendChild(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

function saveAndCreate() {
  clearElement(todaysList);
  createList();
  save();
}

export function checkboxChange() {
  todaysList.addEventListener('change', (e) => {
    if (e.target.tagName.toLowerCase() === 'input') {
      lists.forEach((list) => {
        if (e.target.id.toString() === list.id.toString()) {
          list.completed = e.target.checked;
          save();
        }
      });
    }
    if (e.target.tagName.toLowerCase() === 'textarea') {
      lists.forEach((list) => {
        if (e.target.id.toString() === list.id.toString()) {
          list.description = e.target.value;
          save();
        }
      });
    }
  });
  todaysList.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'i') {
      if (e.target.classList.contains('fa-trash-o')) {
        lists.forEach((list) => {
          const yeg = e.target.previousSibling.previousSibling;
          if (yeg.firstChild.nextSibling.id.toString() === list.id.toString()) {
            if (!list.completed) {
              alert('Check the box to be able to delete');// eslint-disable-line no-alert
            } else {
              lists = lists.filter((list) => !list.completed);
            }
            for (let i = 0; i < lists.length; i += 1) {
              lists[i].id = i + 1;
            }
            saveAndCreate();
          }
        });
      }
    }
  });
}

function createTask(description) {
  return { id: lists.length + 1, description, completed: false };
}

export function addContent() {
  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = newTaskInput.value;
    if (taskName == null || taskName === '') {
      return;
    }
    const list = createTask(taskName);
    newTaskInput.value = null;
    lists.push(list);
    saveAndCreate();
  });
}

clearCompleteTaskButton.addEventListener('click', () => {
  lists = lists.filter((list) => !list.completed);
  for (let i = 0; i < lists.length; i += 1) {
    lists[i].id = i + 1;
  }
  saveAndCreate();
});

export function pageLoad() {
  window.addEventListener('load', () => {
    saveAndCreate();
  });
}
