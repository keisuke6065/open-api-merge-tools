const g = require('../src/gather');
const m = require('../src/merge');

describe("merge function", () => {
    const rootYaml = './test_yaml/openapi.yaml';
    it("merge", () => {
        let bundled = g.gather(rootYaml);
        let refs = {
            internalRef: {$ref: "#/components/schemas/DictionaryDTO"},
            externalRef: {$ref: "./components/schemas/Empty.yaml"}
        };
        let merged = m.merge(refs, bundled);
        console.log(JSON.stringify(merged));
        expect(merged.externalRef.Empty.title).toEqual("Empty Schema");
    });
});
