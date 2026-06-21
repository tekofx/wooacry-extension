import { Card, Group, NumberFormatter, Text } from "@mantine/core";

interface OwnerCardProps {
  owner: Owner;
}

export default function OwnerCard({ owner }: OwnerCardProps) {
  return (
    <Card>
      <Card.Section>
        <Group>
          <Text>{owner.name}</Text>
          <Text>--</Text>
          <NumberFormatter prefix="€ " value={owner.price.toFixed(2)} />
        </Group>
      </Card.Section>
      <Card.Section>
        {owner.stickers.map((sticker, index) => (
          <StickerCard sticker={sticker} />
        ))}
      </Card.Section>
    </Card>
  );
}
