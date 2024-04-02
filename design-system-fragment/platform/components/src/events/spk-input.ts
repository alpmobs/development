export type SpkInputEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'spk-input': SpkInputEvent;
  }
}
