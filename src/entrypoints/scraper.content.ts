// src/entrypoints/scraper.content.ts

export default defineContentScript({
  matches: ["<all_urls>"],
  async main(ctx) {
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log("test");
      if (message.type === "EXTRACT_CART_DATA") {
        const stickers = scrapStickers();
        const owners = computateOwners(stickers);
        const shipping = scrapShipping();

        sendResponse({
          subtotal: scrapSubtotal(),
          shipping: shipping,
          shippingPerOwner: shipping / owners.length,
          totalPayment: scrapTotalPayment(),
          owners: owners,
          stickers: stickers,
        });
      }
      return true;
    });
  },
});
/**
 * Finds all order summary rows containing a specific text string.
 * @param searchText The text to search for within the row (e.g., "Shipping:", "Subtotal").
 * @returns An array of matching HTMLDivElement elements.
 */
function getOrderSummaryRowsByLabel(searchText: string): HTMLDivElement[] {
  // 1. Select all divs where the class starts with the static prefix
  const allRows = document.querySelectorAll(
    'div[class*="order-summary_order-summay-row__"]',
  );

  // 2. Filter elements that contain the specific text
  return Array.from(allRows).filter((el) => {
    const textContent = el.textContent || "";
    return textContent.includes(searchText);
  }) as HTMLDivElement[];
}

function scrapTotalPayment(): number {
  const totalPaymentDiv = getOrderSummaryRowsByLabel("Order total")[0];
  const paymentAmount = totalPaymentDiv.childNodes[1];

  return parseCurrency(paymentAmount.textContent || "");
}

function scrapSubtotal(): number {
  const totalPaymentDiv = getOrderSummaryRowsByLabel("Subtotal")[0];
  const paymentAmount = totalPaymentDiv.childNodes[1];

  return parseCurrency(paymentAmount.textContent || "");
}

function scrapShipping(): number {
  const shippingDiv = getOrderSummaryRowsByLabel("Shipping")[0];
  const shipping = shippingDiv.querySelector(
    'div[class="flex items-center justify-end"]',
  );
  return parseCurrency(shipping?.textContent || "");
}

function scrapStickers(): Sticker[] {
  const cartItems = document.querySelectorAll(
    'div[class*="product-cart-item_cart-item__"]',
  );

  const stickers: Sticker[] = Array.from(cartItems).map((item) => {
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

    const ownerMatch = name.match(/\[(.*?)\]/);
    const owner = ownerMatch ? ownerMatch[1] : "";

    // 4. Extract ONLY the actual price
    let price = 0;
    if (priceContainerEl) {
      const textNode = Array.from(priceContainerEl.childNodes).find(
        (node) =>
          node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== "",
      );
      price = parseCurrency(textNode?.textContent?.trim() || "");
    }

    let quantity = quantityInputEl
      ? parseFloat(quantityInputEl.value) || 0
      : parseQuantity(quantityEl?.textContent || "");

    let totalPrice = quantity * price;
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
      owner: owner,
    };
  });

  return stickers;
}

function computateOwners(stickers: Sticker[]): Owner[] {
  // 1. Group stickers by owner name
  const ownersMap = stickers.reduce(
    (acc, sticker) => {
      const ownerName = sticker.owner;

      if (!acc[ownerName]) {
        acc[ownerName] = {
          name: ownerName,
          subtotal: 0,
          stickers: [],
        };
      }

      // Add sticker to the owner's list
      acc[ownerName].stickers.push(sticker);

      // Accumulate total price for the owner
      acc[ownerName].subtotal += sticker.totalPrice;

      return acc;
    },
    {} as Record<string, Owner>,
  );

  // 2. Convert the map object to an array
  const owners: Owner[] = Object.values(ownersMap);

  return owners;
}

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
