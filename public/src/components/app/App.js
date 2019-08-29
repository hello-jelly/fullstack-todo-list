import Component from '../Component.js';
import ToDoList from './ToDoListApp.js';

class App extends Component {

    onRender(dom) {
        const header = new ToDoList();
        dom.prepend(header.renderDOM());
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

export default App;