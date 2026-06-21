import {
  Accordion,
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
  return (
    <Card padding="xs">
      <Card.Section inheritPadding>
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
      <Card.Section inheritPadding>
        <Accordion>
          <Accordion.Item value="a">
            <Accordion.Control>Mostrar mas</Accordion.Control>
            <Accordion.Panel>
              {owner.stickers.map((sticker, index) => (
                <StickerCard sticker={sticker} />
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
    </Card>
  );
}
