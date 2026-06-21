// src/entrypoints/scraper.content.ts
export default defineContentScript({
  matches: ["<all_urls>"],

  async main(ctx) {
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "GET_FULL_HTML") {
        // Gets the entire <html>...</html> tag and its contents
        const html = document.documentElement.outerHTML;

        // Optional: Prepend DOCTYPE if needed (outerHTML excludes it)
        const doctype = document.doctype
          ? `<!DOCTYPE ${document.doctype.name}>`
          : "";

        sendResponse({
          html: doctype + "\n" + html,
        });
      }
      return true; // Keep channel open for async response
    });
  },
});
