import ToDoApp from './components/app/App.js';

const app = new ToDoApp();
document.body.prepend(app.renderDOM());