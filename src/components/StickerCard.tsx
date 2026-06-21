import {
  AppShell,
  Box,
  Card,
  Group,
  RingProgress,
  Text,
  Image,
  Button,
  Collapse,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface StickerCardProps {
  sticker: Sticker;
}

export default function StickerCard({ sticker }: StickerCardProps) {
  const [expanded, { toggle }] = useDisclosure(false);
  return (
    <Card padding="sm" withBorder orientation="horizontal">
      <Card.Section inheritPadding px="xs" withBorder>
        <Image height={100} src={sticker.imgUrl} />
      </Card.Section>

      <Card.Section inheritPadding px="md">
        <Text fz="xl">{sticker.name}</Text>
        <Group>
          <Text>{sticker.price}</Text>
          <Text>X</Text>
          <Text>{sticker.quantity}</Text>
          <Text>=</Text>
          <Text>{sticker.totalPrice}</Text>
        </Group>
        <Button onClick={toggle}>Show more</Button>
        <Collapse expanded={expanded}>
          <Text>{sticker.variation}</Text>
          <Text>{sticker.discount}%</Text>
        </Collapse>
      </Card.Section>
    </Card>
  );
}
