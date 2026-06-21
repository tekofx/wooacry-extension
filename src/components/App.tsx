import { useState } from "react";
import { AppShell, Burger, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import StickerCard from "./StickerCard";
interface MessageResponse {
  data: Sticker[];
}
function App() {
  const [opened, { toggle }] = useDisclosure();
  const [stickers, setStickers] = useState<Sticker[]>([]);
  async function getPageSource() {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab.id) return;

    try {
      const response = (await browser.tabs.sendMessage(tab.id, {
        type: "EXTRACT_CART_DATA",
      })) as MessageResponse;

      setStickers(response.data);
    } catch (error) {
      console.error("Failed to get HTML:", error);
    }
  }
  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar>Navbar</AppShell.Navbar>

      <AppShell.Main>
        <Button onClick={() => getPageSource()}>Clicl</Button>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {stickers.map((sticker, index) => (
            <StickerCard sticker={sticker} />
          ))}
        </ul>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
