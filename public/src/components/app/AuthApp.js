import Component from '../Component.js';
import Header from './Header.js';
import SignUp from '../auth/SignUp.js';
import SignIn from '../auth/SignIn.js';
import { signUp as userSignUp, signIn as userSignIn } from '../../services/todo-api.js';
import store from '../../services/store.js';

function success(user) {
    store.setToken(user.token);
    const searchParams = new URLSearchParams(location.search);
    location = searchParams.get('redirect') || './index.html';
}

class AuthApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const errors = dom.querySelector('.errors');
        const signUpContainer = dom.querySelector('#signup-container');
        const signInContainer = dom.querySelector('#signin-container');
        
        const signUp = new SignUp({
            onSignUp: newUser => {
                errors.textContent = '';

                return userSignUp(newUser)
                    .then(user => {
                        success(user);
                    })
                    .catch(err => {
                        errors.textContent = err;
                    });
            }
        });
        signUpContainer.appendChild(signUp.renderDOM());
        
        const signIn = new SignIn({
            onSignIn: credentials => {
                errors.textContent = '';

                return userSignIn(credentials)
                    .then(user => {
                        success(user);
                    })
                    .catch(err => {
                        errors.textContent = err;
                    });
            }
        });
        signInContainer.prepend(signIn.renderDOM());

        const switchToSignIn = dom.querySelector('#signin-button');
        switchToSignIn.addEventListener('click', () => {
            signInContainer.classList.remove('hidden');
            signUpContainer.classList.add('hidden');
        });
        
        const switchToSignUp = dom.querySelector('#signin-button');
        switchToSignUp.addEventListener('click', () => {
            signUpContainer.classList.remove('no-display');
            signInContainer.classList.add('no-display');
        });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    <div class="first-form">
                        <p class="errors"></p>
                        <section class="hidden" id="signup-container">
                            <p class="switch">
                                <a id="signin-button">Already a User?</a>
                            </p>
                        </section>

                        <section id="signin-container">
                            <p class="switch"></p>
                                <button id="signup-button">Need to create an Account?</button>
                            </p>
                        </section>
                    </div>
                </main>
            </div>
        `;
    }
}

export default AuthApp;