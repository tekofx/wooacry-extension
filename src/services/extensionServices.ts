import { NotOnCardError, TabNotFoundError } from "@/interfaces/Errors";

async function getData(): Promise<MessageResponse> {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!tab.id) throw new TabNotFoundError("Tab not found");

  if (tab.url != "https://wooacry.com/cart") {
    throw new NotOnCardError("You are not in wooacry cart");
  }

  try {
    const response = (await browser.tabs.sendMessage(tab.id, {
      type: "EXTRACT_CART_DATA",
    })) as MessageResponse;

    return response;
  } catch (error) {
    throw new Error("Error");
  }
}

export { getData };
