export type SpkBlurEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'spk-blur': SpkBlurEvent;
  }
}
