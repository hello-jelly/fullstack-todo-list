import ToDo from '../src/components/items/ToDo.js';
const test = QUnit.test;

QUnit.module('To Do');

test('renders', assert => {
    // arrange
    const item = {
        id: 4,
        name: 'Laundry',
        inactive: false
    };

    const expected = /*html*/`
    <li class="to-do"> <span class="">Laundry</span> <div class="buttons"> <button class="inactive-button"> Make Inactive </button> <button class="remove-button"> <img class="trash-icon" src="assets/trash.png" alt="trash icon" /> </button> </div> </li>
    `;

    // act
    const toDo = new ToDo({ item });
    const html = toDo.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});

test('renders iuvbhj', assert => {
    // arrange
    const item = {
        id: 14,
        name: 'Make The Bed',
        inactive: true
    };

    const expected = /*html*/`
    <li class="to-do"> <span class="inactive">Make The Bed</span> <div class="buttons"> <button class="inactive-button"> Make Active </button> <button class="remove-button"> <img class="trash-icon" src="assets/trash.png" alt="trash icon" /> </button> </div> </li>
    `;

    // act
    const toDo = new ToDo({ item });
    const html = toDo.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});
