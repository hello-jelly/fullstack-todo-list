import Component from '../Component.js';

class ItemForm extends Component {

    onRender(dom) {
        const onAdd = this.props.onAdd;
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[name=type]');
        const error = dom.querySelector('p.error');

        form.addEventListener('submit', event => {
            event.preventDefault();

            const itemType = {
                name: input.value
            };

            error.textContent = '';

            onAdd(itemType)
                .then(() => {
                    form.reset();
                    document.activeElement.blur();
                })
                .catch(err => {
                    error.textContent = err;
                });
        });
    }

    renderHTML() {
        return /*html*/`
            <section class="form">
                <form class="add-form">
                    <label for="title">Create A New Task: </label>
                    <input class="add-input" type="text" name="type" required placeholder="i.e. Do Homework">
                    <button class="add-button">Add</button>
                    <button id="log-out">Logout</button>
                </form>
                <p class="error"></p>
            </section>
        `;
    }
}

export default ItemForm;