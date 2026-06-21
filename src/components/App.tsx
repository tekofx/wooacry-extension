import { useState } from "react";
import { AppShell, Burger, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
          {stickers.map((item, index) => (
            <li
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                marginBottom: "0.5rem",
                borderRadius: "4px",
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{item.name}</h3>
              <p style={{ margin: "0.25rem 0", color: "#555" }}>
                <strong>Variation:</strong> {item.variation}
              </p>
              <p
                style={{
                  margin: "0.25rem 0",
                  color: "#2e7d32",
                  fontWeight: "bold",
                }}
              >
                Price: €{item.price.toFixed(2)}
                {item.originalPrice > 0 && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#999",
                      marginLeft: "8px",
                      fontWeight: "normal",
                    }}
                  >
                    €{item.originalPrice.toFixed(2)}
                  </span>
                )}
                {item.discount !== 0 && (
                  <span
                    style={{
                      backgroundColor: "#ffebee",
                      color: "#c62828",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      marginLeft: "8px",
                    }}
                  >
                    {item.discount}%
                  </span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
