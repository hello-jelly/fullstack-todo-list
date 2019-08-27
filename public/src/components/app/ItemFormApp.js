import Component from '../Component.js';
import Header from './Header.js';
import ItemForm from '../items/ItemForm.js';
import { getItems } from '../../services/todo-api';

class ItemFormApp extends Component {

    onRender(dom) {
        const header = new Header({ title: 'To Do, Later, List' });
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');

        getItems()
            .then(items => {
                const itemForm = new ItemForm({ items });
                main.appendChild(itemForm.renderDOM());
            });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    
                </main>
            </div>
        `;
    }
}

export default ItemFormApp;