import Component from '../Component.js';
import ToDo from './ToDo.js';

class ToDoList extends Component {
    
    onRender(list) {
        const items = this.props.items;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        items.forEach(item => {
            const toDo = new ToDo({ item, onUpdate, onRemove });
            list.appendChild(toDo.renderDOM());
        });
        
            // .map(item => new ToDo({ item }))
            // .map(toDo => toDo.renderDOM())
            // .forEach(dom => list.appendChild(dom));
    }
    renderHTML() {

        return /*html*/`
            <ul></ul>
        `;
    }
}

export default ToDoList;