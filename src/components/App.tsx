import { useState } from "react";
import { AppShell, Group, Stack, Text, Title } from "@mantine/core";
import OwnerCard from "./OwnerCard";
import MoneyField from "./MoneyField";
import { getData } from "@/services/extensionServices";
import ErrorComponent from "./ErrorComponent";
import CartDataComponent from "./CartDataComponent";
function App() {
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
        <ErrorComponent error={error} />
        <CartDataComponent data={data} />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
