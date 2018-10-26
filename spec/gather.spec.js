const g = require('../src/gather');
const fs = require('fs');

describe("A suite is just a function", () => {
    const rootYaml = './test_yaml/openapi.yaml';
    it("and so is a spec", () => {
        let yamlPaths = g.walkDirectory(rootYaml);
        expect(yamlPaths).toContain('./test_yaml/components/schemas/.gitkeep');
    });
});
