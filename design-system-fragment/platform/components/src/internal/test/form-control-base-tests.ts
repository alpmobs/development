/* eslint-disable max-len */
/* eslint-disable camelcase */
import { expect, fixture, html } from '@open-wc/testing';
import type { SparkFormControl } from '../spark-element.js';

type CreateControlFn = () => Promise<SparkFormControl>;

//
// Local helper functions
//

/**
 * Creates a testable Spark form control instance
 */
function createFormControl<T extends SparkFormControl = SparkFormControl>(tagName: string): Promise<T> {
  return fixture<T>(`<${tagName}></${tagName}>`);
}

/**
 * Runs an action while listening for emitted events of a given type. Returns an array of all events of the given type
 * that have been emitted while the action was running.
 */
function checkEventEmissions(control: SparkFormControl, eventType: string, action: () => void): Event[] {
  const emittedEvents: Event[] = [];

  const eventHandler = (event: Event) => {
    emittedEvents.push(event);
  };

  try {
    control.addEventListener(eventType, eventHandler);
    action();
  } finally {
    control.removeEventListener(eventType, eventHandler);
  }

  return emittedEvents;
}

/**
 * Component `spk-button` behaves quite different to the other components. To keep things simple we use simple conditions
 *   here. `spk-button` might stay the only component in Spark core behaves that way, so we just hard code it here.
 */
function getMode(control: SparkFormControl) {
  if (
    control.localName === 'spk-button'
    && 'href' in control
    && 'type' in control
    && 'target' in control
    && 'rel' in control
    && control.type === 'button'
    && !control.href
    && !control.target
    && !control.rel
  ) {
    return 'spkButtonOfTypeButton';
  }

  // <spk-button href="...">
  if (control.localName === 'spk-button' && 'href' in control && !!control.href) {
    return 'spkButtonWithHRef';
  }

  // all other components
  return 'standard';
}

//
//  Special tests for <spk-button type="button">
//
function runSpecialTests_spkButtonOfTypeButton(createControl: CreateControlFn) {
  it('should make sure that `.validity.valid` is `false` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.validity.valid).to.equal(false);
  });

  it('should make sure that calling `.checkValidity()` will still return `true` when custom error has been set', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.checkValidity()).to.equal(true);
  });

  it('should make sure that calling `.reportValidity()` will still return `true` when custom error has been set', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.reportValidity()).to.equal(true);
  });

  it('should not emit an `spk-invalid` event when `.checkValidity()` is called in custom error case, and not disabled', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    control.disabled = false;
    await control.updateComplete;
    const emittedEvents = checkEventEmissions(control, 'spk-invalid', () => control.checkValidity());
    expect(emittedEvents.length).to.equal(0);
  });

  it('should not emit an `spk-invalid` event when `.reportValidity()` is called in custom error case, and not disabled', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    control.disabled = false;
    await control.updateComplete;
    const emittedEvents = checkEventEmissions(control, 'spk-invalid', () => control.reportValidity());

    expect(emittedEvents.length).to.equal(0);
  });
}

//
// Special tests for <spk-button href="...">
//
function runSpecialTests_spkButtonWithHref(createControl: CreateControlFn) {
  it('should make sure that calling `.checkValidity()` will return `true` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.checkValidity()).to.equal(true);
  });

  it('should make sure that calling `.reportValidity()` will return `true` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.reportValidity()).to.equal(true);
  });

  it('should not emit an `spk-invalid` event when `.checkValidity()` is called in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    await control.updateComplete;
    const emittedEvents = checkEventEmissions(control, 'spk-invalid', () => control.checkValidity());
    expect(emittedEvents.length).to.equal(0);
  });

  it('should not emit an `spk-invalid` event when `.reportValidity()` is called in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    await control.updateComplete;
    const emittedEvents = checkEventEmissions(control, 'spk-invalid', () => control.reportValidity());
    expect(emittedEvents.length).to.equal(0);
  });
}

/**
 * Special tests for all components with standard behavior
 */
function runSpecialTests_standard(createControl: CreateControlFn) {
  it('should make sure that `.validity.valid` is `false` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.validity.valid).to.equal(false);
  });

  it('should make sure that calling `.checkValidity()` will return `false` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.checkValidity()).to.equal(false);
  });

  it('should make sure that calling `.reportValidity()` will return `false` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.reportValidity()).to.equal(false);
  });

  it('should emit an `spk-invalid` event when `.checkValidity()` is called in custom error case and not disabled', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    control.disabled = false;
    await control.updateComplete;
    const emittedEvents = checkEventEmissions(control, 'spk-invalid', () => control.checkValidity());
    expect(emittedEvents.length).to.equal(1);
  });

  it('should emit an `spk-invalid` event when `.reportValidity()` is called in custom error case and not disabled', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    control.disabled = false;
    await control.updateComplete;
    const emittedEvents = checkEventEmissions(control, 'spk-invalid', () => control.reportValidity());
    expect(emittedEvents.length).to.equal(1);
  });
}

/**
 * Applicable for all Spark form controls. This function checks the behavior of:
 *   - `.validity`
 *   - `.validationMessage`,
 *   - `.checkValidity()`
 *   - `.reportValidity()`
 *   - `.setCustomValidity(msg)`
 */
function runAllValidityTests<T extends SparkFormControl = SparkFormControl>(
  tagName: string,
  displayName: string,
  createControl: () => Promise<SparkFormControl>
) {
  // will be used later to retrieve meta information about the control
  describe(`Form validity base test for ${displayName}`, async () => {
    let control: SparkFormControl;

    beforeEach(async () => {
      control = await createControl();
    });

    it('SHOULD get the associated form element', async () => {
      const form = await fixture(html`
        <form id="a" action="foo" method="post" target="_self">${control}</form>
      `);

      expect(form.querySelector<T>(tagName)!.getForm()).to.be.equal(form);
    });

    it('SHOULD have a property `validity` of type `object`', () => {
      expect(control).satisfy(() => control.validity !== null && typeof control.validity === 'object');
    });

    it('SHOULD have a property `validationMessage` of type `string`', () => {
      expect(control).satisfy(() => typeof control.validationMessage === 'string');
    });

    it('SHOULD implement method `checkValidity`', () => {
      expect(control).satisfies(() => typeof control.checkValidity === 'function');
    });

    it('SHOULD implement method `setCustomValidity`', () => {
      expect(control).satisfies(() => typeof control.setCustomValidity === 'function');
    });

    it('SHOULD implement method `reportValidity`', () => {
      expect(control).satisfies(() => typeof control.reportValidity === 'function');
    });

    it('SHOULD be valid initially', () => {
      expect(control.validity.valid).to.equal(true);
    });

    it('SHOULD make sure that calling `.checkValidity()` will return `true` when valid', () => {
      expect(control.checkValidity()).to.equal(true);
    });

    it('SHOULD make sure that calling `.reportValidity()` will return `true` when valid', () => {
      expect(control.reportValidity()).to.equal(true);
    });

    it('SHOULD not emit an `spk-invalid` event when `.checkValidity()` is called while valid', () => {
      const emittedEvents = checkEventEmissions(control, 'spk-invalid', () => control.checkValidity());
      expect(emittedEvents.length).to.equal(0);
    });

    it('SHOULD not emit an `spk-invalid` event when `.reportValidity()` is called while valid', () => {
      const emittedEvents = checkEventEmissions(control, 'spk-invalid', () => control.reportValidity());
      expect(emittedEvents.length).to.equal(0);
    });

    // TODO: As soon as `SpkRadioGroup` has a property `disabled` this condition can be removed
    if (tagName !== 'spk-radio-group') {
      it('SHOULD not emit an `spk-invalid` event when `.checkValidity()` is called in custom error case while disabled', async () => {
        control.setCustomValidity('error');
        control.disabled = true;
        await control.updateComplete;
        const emittedEvents = checkEventEmissions(control, 'spk-invalid', () => control.checkValidity());
        expect(emittedEvents.length).to.equal(0);
      });

      it('SHOULD not emit an `spk-invalid` event when `.reportValidity()` is called in custom error case while disabled', async () => {
        control.setCustomValidity('error');
        control.disabled = true;
        await control.updateComplete;
        const emittedEvents = checkEventEmissions(control, 'spk-invalid', () => control.reportValidity());
        expect(emittedEvents.length).to.equal(0);
      });
    }

    // Run special tests depending on component type

    const mode = getMode(await createControl());

    if (mode === 'spkButtonOfTypeButton') {
      runSpecialTests_spkButtonOfTypeButton(createControl);
    } else if (mode === 'spkButtonWithHRef') {
      runSpecialTests_spkButtonWithHref(createControl);
    } else {
      runSpecialTests_standard(createControl);
    }
  });
}

/** Runs a set of generic tests for Spark form controls */
export function runFormControlBaseTests<T extends SparkFormControl = SparkFormControl>(
  tagNameOrConfig:
    | string
    | {
        tagName: string;
        init?: (control: T) => void;
        variantName: string;
      }
) {
  const isStringArg = typeof tagNameOrConfig === 'string';
  const tagName = isStringArg ? tagNameOrConfig : tagNameOrConfig.tagName;

  // component initialization function or null
  const init = isStringArg || !tagNameOrConfig.init //
    ? null
    : tagNameOrConfig.init || null;

  // either `<tagName>` or `<tagName> (<variantName>)
  const displayName = isStringArg //
    ? tagName
    : `${tagName} (${tagNameOrConfig.variantName})`;

  // creates a testable form control instance
  const createControl = async () => {
    const control = await createFormControl<T>(tagName);
    init?.(control);
    return control;
  };

  runAllValidityTests<T>(tagName, displayName, createControl);
}
