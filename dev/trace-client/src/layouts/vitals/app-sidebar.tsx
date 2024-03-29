import {

  ArrowLeftIconChakra,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Slide,
  VStack,
} from "@src/libs";
import {
  AppConstants,
  appStore,
} from '@src/features'
import { AppSideMenu } from "../side-menu/app-side-menu";

function AppSidebar() {
  const isSidebarOpen = appStore.layouts.isSidebarOpen.value;
  const SIDEBARWIDTH = AppConstants.SIDEBAR_WIDTH;
  const HEIGHT = AppConstants.HEADER_HEIGHT;

  return (
    <Slide
      direction="left"
      in={isSidebarOpen}
      style={{
        width: SIDEBARWIDTH,
        overflowY: "auto",
        overflowX: "clip",
        backgroundColor: `${AppConstants.SIDEBAR_BACKGROUND_COLOR}`,
      }}
    >
      <Flex w={SIDEBARWIDTH} pb='1rem' shadow="xs" direction='column' overflowY="auto" justifyContent='space-between' h='100%'>
        {/* Logo and close button */}
        <VStack>
          <HStack justifyContent="space-evenly" w="100%" h={HEIGHT} bg="white">
            <Image src="/trace-logo.png" />
            <IconButton
              aria-label="Slide left"
              icon={<ArrowLeftIconChakra />}
              size="xs"
              onClick={handleClickSidebarClose}
            />
          </HStack>
          <AppSideMenu />
        </VStack>
        <Heading color='gray.500' size="sm" mb='2.5' ml='8'>{appStore.layouts.sideMenuHeading.value}</Heading>
      </Flex>
    </Slide>
  );

  function handleClickSidebarClose() {
    appStore.layouts.isSidebarOpen.value = false;
    appStore.isCloseClicked = true;
  }
}
export { AppSidebar };
