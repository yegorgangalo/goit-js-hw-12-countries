import refs from './refs.js';

const { body, input, label, ul } = refs;

function createDOM() {
    ul.classList.add('country-list');
    input.classList.add('input');
    label.classList.add('input-label');
    body.append(label);
    label.insertAdjacentHTML('beforeend', 'Input Country Name');
    body.append(input);
    body.append(ul);
};

export default createDOM();