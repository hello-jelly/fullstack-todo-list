import Component from '../Component.js';

class ToDo extends Component {

    onRender(dom) {
        const item = this.props.item;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const inactiveButton = dom.querySelector('.inactive-button');
        inactiveButton.addEventListener('click', () => {
            item.inactive = !item.inactive;
            onUpdate(item);
        });
        
        const removeButton = dom.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            if(confirm(`Are you sure you want to remove "${item.name}"?`)) {
                onRemove(item);
            }
        });
    }

    renderHTML() {
        const item = this.props.item;

        return /*html*/`
            <li class="to-do">
                <span class="${item.inactive ? 'inactive' : ''}">${item.name}</span>
                <div>
                    <button class="inactive-button">
                        Make ${item.inactive ? 'Active' : 'Inactive'}
                    </button>
                    <button class="remove-button">
                        <img class="trash-icon" src="assets/trash.png" alt="trash icon" />
                    </button>
                </div>
            </li>
        `;
    }
}

export default ToDo;