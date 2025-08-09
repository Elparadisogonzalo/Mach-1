try {
  lockdown({
    consoleTaming: 'unsafe', // allow console modification
    errorTaming: 'unsafe',   // allow richer stack traces
    mathTaming: 'unsafe',    // allow Math extensions
    dateTaming: 'unsafe',    // allow Date manipulation
    domainTaming: 'unsafe',  // allow dynamic domain adjustments
    overrideTaming: 'moderate', // less strict, allows redefining properties in some cases
  });

  // selectively unfreeze objects after lockdown
  // For example: enable updating Array prototype
  Object.defineProperty(Array.prototype, 'push', {
    writable: true,
    configurable: true,
  });

} catch (error) {
  console.error('Lockdown failed:', error);
  if (globalThis.sentry?.captureException) {
    globalThis.sentry.captureException(
      new Error(`Lockdown failed: ${error.message}`),
    );
  }
}

