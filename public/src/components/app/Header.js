import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        return /*html*/`
        <header>
            <img src="assets/nose-picker.gif" alt="Nose Picker Gif" />
            <h1>TO DO, LATER, LIST</h1>
        </header>
        `;
    }
}

export default Header;