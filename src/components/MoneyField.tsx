import { Badge, NumberFormatter, Paper, Text } from "@mantine/core";

interface MoneyFieldProps {
  text: string;
  quantity: number;
}

export default function MoneyField({ text, quantity }: MoneyFieldProps) {
  return (
    <Badge size="xl">
      <Text>
        {text}: <NumberFormatter prefix="€ " value={quantity.toFixed(2)} />
      </Text>
    </Badge>
  );
}
