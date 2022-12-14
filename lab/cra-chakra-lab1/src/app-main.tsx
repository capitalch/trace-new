import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    Button,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"

export const AppMain = () => (
    <Box  fontSize="2xl">
        <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack >
                {/* <Logo h="40vmin" pointerEvents="none" /> */}
                <Text>
                    Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
                </Text>
                <Link
                    color='red.500'
                    href="https://chakra-ui.com"
                    fontSize="2xl"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn Chakra
                </Link>
                <Button color='primary.400'>My button</Button>
            </VStack>
        </Grid>
    </Box>
)