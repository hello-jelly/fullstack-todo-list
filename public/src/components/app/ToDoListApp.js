import Component from '../Component.js';
import ToDoList from '../items/ToDo-List.js';
import { getItems, updateItem, removeItem } from '../../services/todo-api.js';

class ToDoListApp extends Component {

    onRender(dom) {
        // const header = new Header({ title: 'To Do...Later' });
        // dom.prepend(header.renderDOM());
        
        const main = dom.querySelector('main');

        const itemList = new ToDoList({ 
            items: [],
            onUpdate: item => {
                // part 1: do work on the server
                return updateItem(item)
                    .then(updated => {
                        // part 2: integrate back into our list
                        const items = this.state.items;
                        
                        // what to do with updated?
                        const index = items.indexOf(item);
                        items.splice(index, 1, updated);

                        itemList.update({ items });
                    });
            },
            onRemove: item => {
                // part 1: do work on the server
                return removeItem(item.id)
                    .then(() => {
                        // part 2: integrate back into our list
                        const items = this.state.items;
                        
                        // remove from the list
                        const index = items.indexOf(item);
                        items.splice(index, 1);

                        itemList.update({ items });
                    });
            }
        });
        main.appendChild(itemList.renderDOM());

        getItems({ showAll: true })
            .then(items => {
                this.state.items = items;
                itemList.update({ items });
            })
            .catch(err => {
                // eslint-disable-next-line no-console
                console.log(err);
            });

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