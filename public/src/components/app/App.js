import Component from '../Component.js';
import ToDoList from './ToDoListApp.js';
import Header from './Header.js';
import ItemForm from '../items/ItemForm.js';
import store from '../../services/store.js';
import { getItems, addItem, updateItem, removeItem } from '../../services/todo-api.js';


class App extends Component {

    onRender(dom) {
        const main = dom.querySelector('main');
        const header = new Header();
        dom.prepend(header.renderDOM());

        const itemForm = new ItemForm({
            onAdd: item => {
                return addItem(item)
                    .then(saved => {
                        const items = this.state.items;
                        items.push(saved);
                        list.update({ items });
                    });
            }
        });
        main.appendChild(itemForm.renderDOM());

        const list = new ToDoList({
            items: [],
            onUpdate: item => {
                return updateItem(item)
                    .then(updated => {
                        const items = this.state.items;

                        const index = items.indexOf(item);
                        items.splice(index, 1, updated);

                        list.update({ items });
                    });
            },
            onRemove: item => {
                return removeItem(item.id)
                    .then(() => {
                        const items = this.state.items;

                        const index = items.indexOf(item);
                        items.splice(index, 1);

                        list.update({ items });
                    });
            }
        });
        main.appendChild(list.renderDOM());

        getItems({ showAll: true })
            .then(items => {
                this.state.items = items;
                list.update({ items });
            })
            .catch(err => {
                // eslint-disable-next-line no-console
                console.log(err);
            }
            );
        
        const logoutButton = dom.querySelector('#log-out');

        logoutButton.addEventListener('click', () => {
            store.removeToken();
            window.location = 'auth.html';
        });
    }

    renderHTML() {
        return /*html*/`
        <div>
            <main>
            </main>
        </div>
        `;
    }
}

export default App;