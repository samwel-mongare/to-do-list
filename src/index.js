import _ from 'lodash';
import './style.css';
const todays_list = document.getElementById('todays-list');

const tasksTodo = [
    {
        description: 'Prepare breakfast',
        completed: false,
        index: 1,
    },
    {
        description: 'Prepare Lunch',
        completed: false,
        index: 2,
    },
    {
        description: 'Pick the kids',
        completed: false,
        index: 3,
    },
    {
        description: 'Go shopping',
        completed: false,
        index: 4,
    },
];

window.addEventListener('load', createList());

function createList() {
    [...tasksTodo]
    .forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-item', index);
        listItem.innerHTML = `
        <div class= "listy">
        <input type="checkbox" id="${index}" name="task1" value="task1">
        <label for="${index}">${task.description}</label>
        </div>
            <span>&#8942;</span>
        `;
    todays_list.appendChild(listItem);
    });
}