export type SpkFocusEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'spk-focus': SpkFocusEvent;
  }
}
