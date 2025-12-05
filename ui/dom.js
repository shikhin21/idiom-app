/**
 * Minimal DOM manipulation helpers
 * Designed to be easily replaceable with framework components
 */
/**
 * Create an element with properties
 */
export function createElement(tag, props = {}, children = []) {
    const el = document.createElement(tag);
    if (props.className)
        el.className = props.className;
    if (props.id)
        el.id = props.id;
    if (props.textContent)
        el.textContent = props.textContent;
    if (props.innerHTML)
        el.innerHTML = props.innerHTML;
    if (props.onClick)
        el.addEventListener('click', props.onClick);
    if (props.disabled !== undefined)
        el.disabled = props.disabled;
    if (props.type)
        el.type = props.type;
    if (props.value)
        el.value = props.value;
    if (props.name)
        el.name = props.name;
    if (props.htmlFor)
        el.htmlFor = props.htmlFor;
    if (props.checked !== undefined)
        el.checked = props.checked;
    if (props.style)
        el.setAttribute('style', props.style);
    children.forEach((child) => {
        if (typeof child === 'string') {
            el.appendChild(document.createTextNode(child));
        }
        else {
            el.appendChild(child);
        }
    });
    return el;
}
/**
 * Shorthand helpers
 */
export const div = (props = {}, children = []) => createElement('div', props, children);
export const span = (props = {}, children = []) => createElement('span', props, children);
export const button = (props = {}, children = []) => createElement('button', props, children);
export const h1 = (props = {}, children = []) => createElement('h1', props, children);
export const h2 = (props = {}, children = []) => createElement('h2', props, children);
export const h3 = (props = {}, children = []) => createElement('h3', props, children);
export const p = (props = {}, children = []) => createElement('p', props, children);
export const ul = (props = {}, children = []) => createElement('ul', props, children);
export const li = (props = {}, children = []) => createElement('li', props, children);
export const label = (props = {}, children = []) => createElement('label', props, children);
export const input = (props = {}) => createElement('input', props);
/**
 * Clear all children from an element
 */
export function clearElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}
/**
 * Mount content to a container
 */
export function mount(container, content) {
    clearElement(container);
    container.appendChild(content);
}
/**
 * Get element by ID with type safety
 */
export function getById(id) {
    return document.getElementById(id);
}
//# sourceMappingURL=dom.js.map