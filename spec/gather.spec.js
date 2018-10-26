const g = require('../src/gather');
const fs = require('fs');

describe("gather function", () => {
    const rootYaml = './test_yaml/openapi.yaml';
    it("gather", () => {
        let loaded = g.gather(rootYaml);
        expect(Object.keys(loaded)).toContain('./test_yaml/components/schemas/Empty.yaml');
        const loadedObj = loaded['./test_yaml/components/schemas/Empty.yaml'];
        expect(loadedObj.Empty.title).toEqual("Empty Schema");
    });
});
