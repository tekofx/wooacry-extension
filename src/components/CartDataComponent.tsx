import { Stack, Text } from "@mantine/core";

interface CartDataComponentProps {
  data: MessageResponse | undefined;
}

export default function CartDataComponent({ data }: CartDataComponentProps) {
  if (!data) return null;
  return (
    <Stack align="center" justify="center">
      <MoneyField text="Subtotal" quantity={data.subtotal} />
      <Text>+</Text>
      <MoneyField text="Shipping" quantity={data.shipping} />
      <Text>+</Text>

      <MoneyField text="Shipping each" quantity={data.shippingPerOwner} />
      <Text>+</Text>

      <MoneyField text="Total payment" quantity={data.totalPayment} />
      {data.owners.map((owner, index) => (
        <OwnerCard owner={owner} />
      ))}
    </Stack>
  );
}
