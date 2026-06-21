import { createTheme, MantineColorsTuple, Mark } from "@mantine/core";

const myColor: MantineColorsTuple = [
  "#f6eeff",
  "#e7daf6",
  "#cab2e9",
  "#ad88db",
  "#9464d0",
  "#844dc9",
  "#7d41c7",
  "#6b33b0",
  "#5f2d9e",
  "#52258b",
];

const theme = createTheme({
  colors: {
    purple: myColor,
  },
  primaryColor: "purple",

  components: {
    Mark: Mark.extend({
      defaultProps: {
        color: "purple",
      },
    }),
  },
});

export default theme;
