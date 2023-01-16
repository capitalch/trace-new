import { extendTheme } from "@chakra-ui/react";

const themeExtension = {
    colors: {
        primary: "blue",
    },
};

const theme = extendTheme(themeExtension);

export default theme;