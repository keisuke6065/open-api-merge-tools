const m = require('../src/merge');

describe("merge function", () => {
    it("merge", () => {
        let bundled = {
            "./components/schemas/Empty.yaml": {
                hoge: "hoge",
                piyo: "piyo"
            }
        };
        let target = {
            internalRef: {$ref: "#/components/schemas/DictionaryDTO"},
            externalRef: {$ref: "./components/schemas/Empty.yaml"},
            externalRefArray: [
                {$ref: "#/components/schemas/DictionaryDTO"},
                {$ref: "./components/schemas/Empty.yaml"}
            ]
        };
        let merged = m.merge(target, bundled);
        expect(merged.externalRef.piyo).toEqual("piyo");
        expect(merged.externalRefArray[1].piyo).toEqual("piyo");
    });
});
