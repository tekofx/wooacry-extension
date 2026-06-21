import { useState } from "react";
import { AppShell, Burger, Button, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import StickerCard from "./StickerCard";
import OwnerCard from "./OwnerCard";
function App() {
  const [opened, { toggle }] = useDisclosure();
  const [data, setData] = useState<MessageResponse>();

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
      setData(response);
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
          <Text>Subtotal: {data?.subtotal}</Text>
          <Text>Shipping: {data?.shipping}</Text>
          <Text>Shipping per owner: {data?.shippingPerOwner}</Text>
          <Text>Total payment: {data?.totalPayment}</Text>

          {/* {stickers.map((sticker, index) => (
            <StickerCard sticker={sticker} />
          ))} */}
          {data?.owners.map((owner, index) => (
            <OwnerCard owner={owner} />
          ))}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
