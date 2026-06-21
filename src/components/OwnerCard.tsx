import {
  Button,
  Card,
  Collapse,
  Group,
  NumberFormatter,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface OwnerCardProps {
  owner: Owner;
}

export default function OwnerCard({ owner }: OwnerCardProps) {
  const [expanded, { toggle }] = useDisclosure(false);

  return (
    <Card>
      <Card.Section>
        <Stack>
          <Text>{owner.name}</Text>

          <Group>
            <NumberFormatter prefix="€ " value={owner.subtotal.toFixed(2)} />
            +
            <NumberFormatter prefix="€ " value={owner.shipping.toFixed(2)} />
            =
            <NumberFormatter
              prefix="€ "
              value={owner.totalPayment.toFixed(2)}
            />
          </Group>
        </Stack>
      </Card.Section>
      <Card.Section>
        <Button onClick={toggle}>Show more</Button>
        <Collapse expanded={expanded}>
          {owner.stickers.map((sticker, index) => (
            <StickerCard sticker={sticker} />
          ))}
        </Collapse>
      </Card.Section>
    </Card>
  );
}
