import { useState } from "react";
import { AppShell, Burger, Button, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import StickerCard from "./StickerCard";
import OwnerCard from "./OwnerCard";
function App() {
  const [opened, { toggle }] = useDisclosure();
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);

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

      setStickers(response.stickers);
      setOwners(response.owners);
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
        <Stack>
          {/* {stickers.map((sticker, index) => (
            <StickerCard sticker={sticker} />
          ))} */}
          {owners.map((owner, index) => (
            <OwnerCard owner={owner} />
          ))}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
