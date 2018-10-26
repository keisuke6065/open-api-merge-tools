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
        console.log("input: " + JSON.stringify(target) + " bundled: " + JSON.stringify(bundled));
        let merged = m.merge(target, bundled);
        console.log("result: " + JSON.stringify(merged));
        expect(merged.externalRef.piyo).toEqual("piyo");
        expect(merged.externalRefArray[1].piyo).toEqual("piyo");
    });
});
