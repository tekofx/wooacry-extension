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
          const nameEl: HTMLDivElement | null = item.querySelector(
            '[class*="product-cart-item_cart-item-product__"]',
          );
          const variationEl: HTMLDivElement | null = item.querySelector(
            '[class*="product-cart-item_cart-item-variation__"]',
          );
          const priceContainerEl: HTMLDivElement | null = item.querySelector(
            '[class*="product-cart-item_cart-item-price__"]',
          );
          const originalPriceEl: HTMLDivElement | null = item.querySelector(
            '[class*="product-cart-item_cart-item-original__"]',
          );
          const discountEl: HTMLDivElement | null = item.querySelector(
            '[class*="product-cart-item_cart-item-discount__"]',
          );
          const quantityEl: HTMLDivElement | null = item.querySelector(
            '[class*="product-cart-item_cart-item-count__"]',
          );
          const imageEl: HTMLImageElement | null = item.querySelector(
            '[class*="product-cart-item_cart-item-image__"]',
          );

          let quantityInputEl: HTMLInputElement | null = null;

          if (quantityEl == null) {
            // Fallback: Look for the input field inside the current item container
            quantityInputEl = item.querySelector<HTMLInputElement>(
              ".stepper_input___Anww",
            );
          }

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
          let price = 0;
          if (priceContainerEl) {
            const textNode = Array.from(priceContainerEl.childNodes).find(
              (node) =>
                node.nodeType === Node.TEXT_NODE &&
                node.textContent?.trim() !== "",
            );
            price = parseCurrency(textNode?.textContent?.trim() || "");
          }

          let quantity = quantityInputEl
            ? parseFloat(quantityInputEl.value) || 0
            : parseQuantity(quantityEl?.textContent || "");

          let totalPrice = parseFloat((quantity * price).toFixed(2));
          let variation = variationEl?.textContent?.trim() || "";
          let originalPrice = parseCurrency(
            originalPriceEl?.textContent?.trim() || "",
          );
          let discount = parsePercentage(discountEl?.textContent?.trim() || "");
          let imgUrl = imageEl?.src || "";

          return {
            name: name,
            variation: variation,
            price: price,
            originalPrice: originalPrice,
            quantity: quantity,
            discount: discount,
            imgUrl: imgUrl,
            totalPrice: totalPrice,
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

// Helper function to parse quantity
const parseQuantity = (str: string): number => {
  if (!str) return 0;
  // Remove any non-numeric chars
  const cleanStr = str.replace(/[^\d]/g, "");
  const num = parseFloat(cleanStr);
  return isNaN(num) ? 0 : num;
};
