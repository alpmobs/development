export type SpkInvalidEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'spk-invalid': SpkInvalidEvent;
  }
}
