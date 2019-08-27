import Component from '../Component.js';
import Header from './Header.js';
import ToDoList from '../items/ToDo-List.js';

class ToDoListApp extends Component {

    onRender(dom) {
        const header = new Header({ title: 'To Do, Later, List' });
        dom.prepend(header.renderDOM());
        
        const main = dom.querySelector('main');
        const list = new ToDoList();
        main.appendChild(list.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main></main>
            </div>
        `;
    }
}

export default ToDoListApp;