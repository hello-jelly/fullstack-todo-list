import Component from '../Component.js';

class SignUp extends Component {


    onRender(form) {
        const onSignUp = this.props.onSignUp;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const user = {
                displayName: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            onSignUp(user);
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="auth-form standard">
                <p>
                    <label for="name">Name:</label>
                    <input id="name" name="name" required placeholder="Your Name">
                </p>

                <p>
                    <button>Sign Up:</button>
                </p>
            </form>
        `;
    }
}

export default SignUp;