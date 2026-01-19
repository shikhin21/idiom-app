/**
 * Minimal DOM manipulation helpers
 * Designed to be easily replaceable with framework components
 */
type EventHandler = (e: Event) => void;
/**
 * Create an element with properties
 */
export declare function createElement<K extends keyof HTMLElementTagNameMap>(tag: K, props?: {
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
}, children?: (HTMLElement | string)[]): HTMLElementTagNameMap[K];
/**
 * Shorthand helpers
 */
export declare const div: (props?: Parameters<typeof createElement>[1], children?: Parameters<typeof createElement>[2]) => HTMLDivElement;
export declare const span: (props?: Parameters<typeof createElement>[1], children?: Parameters<typeof createElement>[2]) => HTMLSpanElement;
export declare const button: (props?: Parameters<typeof createElement>[1], children?: Parameters<typeof createElement>[2]) => HTMLButtonElement;
export declare const h1: (props?: Parameters<typeof createElement>[1], children?: Parameters<typeof createElement>[2]) => HTMLHeadingElement;
export declare const h2: (props?: Parameters<typeof createElement>[1], children?: Parameters<typeof createElement>[2]) => HTMLHeadingElement;
export declare const h3: (props?: Parameters<typeof createElement>[1], children?: Parameters<typeof createElement>[2]) => HTMLHeadingElement;
export declare const p: (props?: Parameters<typeof createElement>[1], children?: Parameters<typeof createElement>[2]) => HTMLParagraphElement;
export declare const ul: (props?: Parameters<typeof createElement>[1], children?: Parameters<typeof createElement>[2]) => HTMLUListElement;
export declare const li: (props?: Parameters<typeof createElement>[1], children?: Parameters<typeof createElement>[2]) => HTMLLIElement;
export declare const label: (props?: Parameters<typeof createElement>[1], children?: Parameters<typeof createElement>[2]) => HTMLLabelElement;
export declare const input: (props?: Parameters<typeof createElement>[1]) => HTMLInputElement;
/**
 * Clear all children from an element
 */
export declare function clearElement(el: HTMLElement): void;
/**
 * Mount content to a container
 */
export declare function mount(container: HTMLElement, content: HTMLElement): void;
/**
 * Get element by ID with type safety
 */
export declare function getById<T extends HTMLElement>(id: string): T | null;
export {};
//# sourceMappingURL=dom.d.ts.map