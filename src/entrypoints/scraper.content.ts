// src/entrypoints/scraper.content.ts

export default defineContentScript({
  matches: ["<all_urls>"],
  async main(ctx) {
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log("test");
      if (message.type === "EXTRACT_CART_DATA") {
        // 1. Select all cart item containers
        const cartItems = document.querySelectorAll(
          'div[class*="product-cart-item_cart-item__"]',
        );

        const extractedData: Sticker[] = Array.from(cartItems).map((item) => {
          // 2. Query specific children relative to the item
          const nameEl = item.querySelector(
            '[class*="product-cart-item_cart-item-product__"]',
          );
          const variationEl = item.querySelector(
            '[class*="product-cart-item_cart-item-variation__"]',
          );
          const priceContainerEl = item.querySelector(
            '[class*="product-cart-item_cart-item-price__"]',
          );

          const originalPriceEl = item.querySelector(
            '[class*="product-cart-item_cart-item-original__"]',
          );
          const discountEl = item.querySelector(
            '[class*="product-cart-item_cart-item-discount__"]',
          );

          // 3. Extract text and clean it
          let name = "";
          if (nameEl) {
            name = Array.from(nameEl.childNodes)
              .filter((node) => node.nodeType === Node.TEXT_NODE)
              .map((node) => node.textContent)
              .join("")
              .trim();
          }

          // 4. Extract ONLY the actual price
          let currentPrice = "";
          if (priceContainerEl) {
            const textNode = Array.from(priceContainerEl.childNodes).find(
              (node) =>
                node.nodeType === Node.TEXT_NODE &&
                node.textContent?.trim() !== "",
            );
            currentPrice = textNode?.textContent?.trim() || "";
          }

          return {
            name: name,
            variation: variationEl?.textContent?.trim() || "",
            price: parseCurrency(currentPrice),
            originalPrice: parseCurrency(
              originalPriceEl?.textContent?.trim() || "",
            ),
            discount: parsePercentage(discountEl?.textContent?.trim() || ""),
          };
        });

        sendResponse({ data: extractedData });
      }
      return true;
    });
  },
});
// Helper function to clean and parse currency
const parseCurrency = (str: string): number => {
  if (!str) return 0;
  // Remove everything except digits, dots, and minus signs
  // Adjust regex if your locale uses commas for decimals (e.g., replace ',' with '.')
  const cleanStr = str.replace(/[^\d.-]/g, "");
  const num = parseFloat(cleanStr);
  return isNaN(num) ? 0 : num;
};

// Helper function to parse percentage
const parsePercentage = (str: string): number => {
  if (!str) return 0;
  // Remove '%' and any non-numeric chars except minus
  const cleanStr = str.replace(/[^\d.-]/g, "");
  const num = parseFloat(cleanStr);
  return isNaN(num) ? 0 : num;
};
