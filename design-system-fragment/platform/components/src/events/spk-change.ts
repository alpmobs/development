export type SpkChangeEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'spk-change': SpkChangeEvent;
  }
}
