import { NotOnCardError } from "@/interfaces/Errors";
import { Alert, Button, Stack } from "@mantine/core";

interface ErrorComponentProps {
  error: Error | null;
}

export default function ErrorComponent({ error }: ErrorComponentProps) {
  if (!error) return null;

  const isNotOnCard = error instanceof NotOnCardError;

  return (
    <Stack>
      <Alert variant="filled" color="red">
        {error.message}
      </Alert>
      {isNotOnCard && (
        <Button
          size="xs"
          mt={8}
          onClick={() => {
            browser.tabs.create({ url: "https://wooacry.com/cart" });
            window.close();
          }}
        >
          Go to cart
        </Button>
      )}
    </Stack>
  );
}
