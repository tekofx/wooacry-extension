import {
  Button,
  Card,
  Collapse,
  Group,
  NumberFormatter,
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
        <Group>
          <Text>{owner.name}</Text>
          <Text>--</Text>
          <NumberFormatter prefix="€ " value={owner.subtotal.toFixed(2)} />
        </Group>
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
