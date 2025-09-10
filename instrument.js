// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'https://fa3ed5f11b6b40dec7a4905d99ca4d97@o4509995364450304.ingest.us.sentry.io/4509995366219776',

  // Send structured logs to Sentry
  // enableLogs: true,
  // Tracing
  // tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  // tracesSampleRate: 1.0,
});
