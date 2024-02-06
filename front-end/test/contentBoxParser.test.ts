import { parseContent } from "./../utils/contentBoxParser";
import { JSDOM, DOMWindow } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.document = dom.window.document;
global.window = dom.window as unknown as Window & typeof globalThis;
global.navigator = dom.window.navigator;

// Add DOMParser to the global object
global.DOMParser = dom.window.DOMParser;

describe("parseContent function", () => {
  // Test case of parsing with an <img> tag
  it("should correctly parse content with an image", () => {
    const contentWithImage: string =
      '<p>This is some text content with an image:</p><p><img src="data:image/png;base64,ABC123" alt="Example Image"/></p>';

    const [imgBase64, modifiedContent] = parseContent(contentWithImage);

    expect(imgBase64).toEqual("data:image/png;base64,ABC123");
    expect(modifiedContent).toEqual(
      "<p>This is some text content with an image:</p><p></p>"
    );
  });

  // Test case of parsing without an <img> tag
  it("should correctly parse content without an image", () => {
    const contentWithoutImage: string =
      "<p>This is some text content without an image.</p>";

    const [imgBase64, modifiedContent] = parseContent(contentWithoutImage);

    expect(imgBase64).toBeNull();
    expect(modifiedContent).toEqual(
      "<p>This is some text content without an image.</p>"
    );
  });
});
