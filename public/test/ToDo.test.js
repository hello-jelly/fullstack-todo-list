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
        <li class="to-do"> Laundry 
            <div> 
                <button class="inactive-button"> Mark As Complete </button>
                <button class="remove-button"> 🗑 </button> 
            </div> 
        </li>
    `;

    // act
    const toDo = new ToDo({ item });
    const html = toDo.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});

test('renders', assert => {
    // arrange
    const item = {
        id: 14,
        name: 'Make The Bed',
        inactive: true
    };

    const expected = /*html*/`
        <li class="to-do"> Make The Bed 
            <div> 
                <button class="inactive-button"> Make Active </button>
                <button class="remove-button"> 🗑 </button> 
            </div> 
        </li>
    `;

    // act
    const toDo = new ToDo({ item });
    const html = toDo.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});
