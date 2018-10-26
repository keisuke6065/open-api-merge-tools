const g = require('../src/gather');

describe("gather function", () => {
    const rootYaml = './test_yaml/openapi.yaml';
    it("gather", () => {
        let loaded = g.gather(rootYaml);
        expect(Object.keys(loaded)).toContain('./components/schemas/Empty.yaml');
        const loadedObj = loaded['./components/schemas/Empty.yaml'];
        expect(loadedObj.Empty.title).toEqual("Empty Schema");
    });
});
