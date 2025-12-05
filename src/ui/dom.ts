/**
 * Minimal DOM manipulation helpers
 * Designed to be easily replaceable with framework components
 */

type EventHandler = (e: Event) => void;

/**
 * Create an element with properties
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: {
    className?: string;
    id?: string;
    textContent?: string;
    innerHTML?: string;
    onClick?: EventHandler;
    disabled?: boolean;
    type?: string;
    value?: string;
    name?: string;
    htmlFor?: string;
    checked?: boolean;
    style?: string;
  } = {},
  children: (HTMLElement | string)[] = []
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);

  if (props.className) el.className = props.className;
  if (props.id) el.id = props.id;
  if (props.textContent) el.textContent = props.textContent;
  if (props.innerHTML) el.innerHTML = props.innerHTML;
  if (props.onClick) el.addEventListener('click', props.onClick);
  if (props.disabled !== undefined) (el as HTMLButtonElement).disabled = props.disabled;
  if (props.type) (el as HTMLInputElement).type = props.type;
  if (props.value) (el as HTMLInputElement).value = props.value;
  if (props.name) (el as HTMLInputElement).name = props.name;
  if (props.htmlFor) (el as HTMLLabelElement).htmlFor = props.htmlFor;
  if (props.checked !== undefined) (el as HTMLInputElement).checked = props.checked;
  if (props.style) el.setAttribute('style', props.style);

  children.forEach((child) => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  });

  return el;
}

/**
 * Shorthand helpers
 */
export const div = (
  props: Parameters<typeof createElement>[1] = {},
  children: Parameters<typeof createElement>[2] = []
) => createElement('div', props, children);

export const span = (
  props: Parameters<typeof createElement>[1] = {},
  children: Parameters<typeof createElement>[2] = []
) => createElement('span', props, children);

export const button = (
  props: Parameters<typeof createElement>[1] = {},
  children: Parameters<typeof createElement>[2] = []
) => createElement('button', props, children);

export const h1 = (
  props: Parameters<typeof createElement>[1] = {},
  children: Parameters<typeof createElement>[2] = []
) => createElement('h1', props, children);

export const h2 = (
  props: Parameters<typeof createElement>[1] = {},
  children: Parameters<typeof createElement>[2] = []
) => createElement('h2', props, children);

export const h3 = (
  props: Parameters<typeof createElement>[1] = {},
  children: Parameters<typeof createElement>[2] = []
) => createElement('h3', props, children);

export const p = (
  props: Parameters<typeof createElement>[1] = {},
  children: Parameters<typeof createElement>[2] = []
) => createElement('p', props, children);

export const ul = (
  props: Parameters<typeof createElement>[1] = {},
  children: Parameters<typeof createElement>[2] = []
) => createElement('ul', props, children);

export const li = (
  props: Parameters<typeof createElement>[1] = {},
  children: Parameters<typeof createElement>[2] = []
) => createElement('li', props, children);

export const label = (
  props: Parameters<typeof createElement>[1] = {},
  children: Parameters<typeof createElement>[2] = []
) => createElement('label', props, children);

export const input = (props: Parameters<typeof createElement>[1] = {}) =>
  createElement('input', props);

/**
 * Clear all children from an element
 */
export function clearElement(el: HTMLElement): void {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

/**
 * Mount content to a container
 */
export function mount(container: HTMLElement, content: HTMLElement): void {
  clearElement(container);
  container.appendChild(content);
}

/**
 * Get element by ID with type safety
 */
export function getById<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}
