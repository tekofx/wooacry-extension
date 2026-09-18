import {
  Accordion,
  Badge,
  Button,
  Card,
  Collapse,
  Group,
  NumberFormatter,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { ImageIcon, PersonSimpleIcon } from "@phosphor-icons/react";

interface OwnerCardProps {
  owner: Owner;
}

export default function OwnerCard({ owner }: OwnerCardProps) {
  return (
    <Card padding="xs">
      <Card.Section inheritPadding>
        <Stack>
          <Group>
            <PersonSimpleIcon />
            <Text size="xl">{owner.name}</Text>
            <Badge size="lg">
              <NumberFormatter
                prefix="€ "
                value={owner.totalPayment.toFixed(2)}
              />
            </Badge>
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
