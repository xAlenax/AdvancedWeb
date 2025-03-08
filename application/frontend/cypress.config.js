const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Path to test files under frontend/tests
    specPattern: 'tests/**/*.spec.js', // Adjust the pattern to point to tests folder relative to config
    baseUrl: 'http://localhost:3001', // Update this if your frontend is running on a different port
  },
});
