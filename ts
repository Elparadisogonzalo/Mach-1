import { initializeFaro } from '@grafana/faro-web-sdk';

initializeFaro({
  // Mandatory, the URL of the Grafana Cloud collector with embedded application key.
  // Copy from the configuration page of your application in Grafana.
  url: 'http://faro-collector-us-central-0.grafana.net/collect/{app-key}',

  // Mandatory, the identification label(s) of your application
  app: {
    name: 'my-app',
    version: '1.0.0', // Optional, but recommended
  },
});
