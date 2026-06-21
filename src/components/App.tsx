import { useState } from "react";
import {
  AppShell,
  Burger,
  Button,
  Group,
  NumberFormatter,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import StickerCard from "./StickerCard";
import OwnerCard from "./OwnerCard";
import MoneyField from "./MoneyField";
function App() {
  const [opened, { toggle }] = useDisclosure();
  const [data, setData] = useState<MessageResponse>();

  useEffect(() => {
    const getPageSource = async () => {
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
    };
    getPageSource();
  }, []);

  return (
    <AppShell padding="md">
      <AppShell.Main>
        {data !== undefined && (
          <Stack>
            <MoneyField text="Subtotal" quantity={data.subtotal} />
            <MoneyField text="Shipping" quantity={data.shipping} />
            <MoneyField text="Shipping each" quantity={data.shippingPerOwner} />
            <MoneyField text="Total payment" quantity={data.totalPayment} />
            {data.owners.map((owner, index) => (
              <OwnerCard owner={owner} />
            ))}
          </Stack>
        )}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
