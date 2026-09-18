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
import { getData } from "@/services/extensionServices";
function App() {
  const [opened, { toggle }] = useDisclosure();
  const [data, setData] = useState<MessageResponse>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getPageSource = async () => {
      try {
        const cartData = await getData();
        setData(cartData);
      } catch (e) {
        setError(e as Error);
      }
    };
    getPageSource();
  }, []);

  return (
    <AppShell padding="md">
      <AppShell.Main>
        {error != null && <p>Error: {error.message}</p>}
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
