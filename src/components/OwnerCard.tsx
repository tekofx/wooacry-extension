import {
  Accordion,
  Badge,
  Button,
  Card,
  Collapse,
  Grid,
  Group,
  NumberFormatter,
  Space,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { ImageIcon, PersonSimpleIcon, UserIcon } from "@phosphor-icons/react";

interface OwnerCardProps {
  owner: Owner;
}

export default function OwnerCard({ owner }: OwnerCardProps) {
  return (
    <Card padding="xs" w="100%">
      <Card.Section inheritPadding>
        <Accordion>
          <Accordion.Item value="a">
            <Accordion.Control>
              <Grid>
                <Grid.Col span={7}>
                  <Group>
                    <ThemeIcon>
                      <UserIcon />
                    </ThemeIcon>
                    <Text size="xl">{owner.name}</Text>
                  </Group>
                </Grid.Col>
                <Grid.Col span={5}>
                  <Badge size="lg" w="90%" h="100%">
                    <NumberFormatter
                      prefix="€ "
                      value={owner.totalPayment.toFixed(2)}
                    />
                  </Badge>
                  <Space w="10%" />
                </Grid.Col>
              </Grid>
            </Accordion.Control>
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
