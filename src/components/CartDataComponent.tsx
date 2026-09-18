import { Stack, Text, Title } from "@mantine/core";

interface CartDataComponentProps {
  data: MessageResponse | undefined;
}

export default function CartDataComponent({ data }: CartDataComponentProps) {
  if (!data) return null;
  return (
    <Stack align="center" justify="center" gap="xs">
      <MoneyField text="Total payment" quantity={data.totalPayment} />

      <MoneyField text="Subtotal" quantity={data.subtotal} />
      <MoneyField text="Shipping" quantity={data.shipping} />

      <MoneyField text="Shipping each" quantity={data.shippingPerOwner} />

      <Title>Details</Title>

      {data.owners.map((owner, index) => (
        <OwnerCard owner={owner} />
      ))}
    </Stack>
  );
}
