import { Card, Group, Text, Image, NumberFormatter } from "@mantine/core";

interface StickerCardProps {
  sticker: Sticker;
}

export default function StickerCard({ sticker }: StickerCardProps) {
  return (
    <Card padding="sm" withBorder orientation="horizontal">
      <Card.Section inheritPadding px="xs" withBorder>
        <Image height={100} src={sticker.imgUrl} />
      </Card.Section>

      <Card.Section inheritPadding px="md">
        <Text fz="xl">{sticker.name}</Text>

        <Group>
          <NumberFormatter prefix="€ " value={sticker.price.toFixed(2)} />
          <Text>X</Text>
          <Text>{sticker.quantity}</Text>
          <Text>=</Text>
          <NumberFormatter prefix="€ " value={sticker.totalPrice.toFixed(2)} />
        </Group>
      </Card.Section>
    </Card>
  );
}
