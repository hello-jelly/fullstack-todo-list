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
                    <label for="signup-email">Email:</label>
                    <input id="signup-email" type="email" name="email" required placeholder="you@somewhere.com">
                </p>

                <p>
                    <label for="signup-password">Password:</label>
                    <input id="signup-password" type="password" name="password" required>
                </p>

                <p>
                    <button id="create-account">Create New Account</button>
                </p>
            </form>
        `;
    }
}

export default SignUp;