import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import { AppShell, Burger, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function App() {
  const [opened, { toggle }] = useDisclosure();
  // src/entrypoints/popup/main.ts (or inside a React component)
  async function getPageSource() {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab.id) return;

    try {
      const response = await browser.tabs.sendMessage(tab.id, {
        type: "GET_FULL_HTML",
      });

      console.log("Full HTML Length:", response.html.length);
      console.log("HTML Preview:", response.html.substring(0, 200));

      // You can now store, display, or download 'response.html'
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
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
