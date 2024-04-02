import { defaultReporter, summaryReporter, dotReporter } from '@web/test-runner';
import { junitReporter } from '@web/test-runner-junit-reporter';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: ['tokens/transformer/**/*.test.js', 'components/src/**/*.test.ts'],
  nodeResolve: true,
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
  testFramework: {
    config: {
      timeout: 3000,
      retries: 1,
    },
  },
  reporters: [
    // use the default reporter only for reporting test progress
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    // use another reporter to report test results
    junitReporter({
      outputPath: './reports/js/junit.xml',
      reportLogs: true,
    }),
    summaryReporter(),
    dotReporter(),
  ],
  coverageConfig: {
    report: true,
    reportDir: './reports/js',
  },
  plugins: [
    esbuildPlugin({ ts: true }),
  ],
  testRunnerHtml: (testFramework) => `
    <html>
      <head></head>
      <body>
        <script type="module" src="components/dist/spark.js"></script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
};
