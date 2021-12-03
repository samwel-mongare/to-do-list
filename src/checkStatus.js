const todaysList = document.getElementById('todays-list');

const LOCAL_STORAGE_LIST_KEY = 'tasks.list';
const lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [
  {
    description: 'Prepare breakfast',
    completed: false,
    id: 1,
  },
  {
    description: 'Prepare Lunch',
    completed: false,
    id: 2,
  },
  {
    description: 'Pick the kids',
    completed: true,
    id: 3,
  },
  {
    description: 'Go shopping',
    completed: false,
    id: 4,
  },
];

function createList() {
  lists.forEach((list) => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-name');
    listElement.innerHTML = `
        <form class= "listy" id="listy" autocomplete="on">
        <input type="checkbox" id=${list.id} name="task1" class="work"  ${list.completed ? 'checked' : ''}>
        <label class="labely" for=${list.id}>${list.description}</label>
        </form>
            <span>&#8942;</span>
        `;
    todaysList.appendChild(listElement);
  });
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

export function checkboxChange() {
  todaysList.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'input') {
      lists.forEach((list) => {
        if (e.target.id.toString() === list.id.toString()) {
          list.completed = e.target.checked;
          save();
        }
      });
    }
  });
}

export function pageLoad() {
  window.addEventListener('load', () => {
    createList();
    save();
  });
}
