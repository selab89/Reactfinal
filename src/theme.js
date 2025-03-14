import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "purple.800", // Pas deze waarde aan naar de gewenste achtergrondkleur
      },
    },
  },
  components: {
    Radio: {
      baseStyle: {
        control: {
          _checked: {
            bg: "purple.500", // De kleur wanneer de radio button is geselecteerd
            borderColor: "purple.500",
            _before: {
              bg: "white",
            },
          },
          _unchecked: {
            bg: "white", // De kleur wanneer de radio button niet is geselecteerd
            borderColor: "purple.500",
          },
          _hover: {
            bg: "blue.500", // De kleur bij hoveren
            borderColor: "blue.500",
          },
        },
      },
    },
  },
});

