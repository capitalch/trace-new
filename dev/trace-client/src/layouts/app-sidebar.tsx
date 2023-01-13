import {
  AppConstants,
  appStaticStore,
  appStore,
  ArrowLeftIconChakra,
  Heading,
  HStack,
  IconButton,
  Image,
  Slide,
  VStack,
} from "@src/features";
import { AppSideMenu } from "./side-menu/app-side-menu";

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
      <VStack w={SIDEBARWIDTH} shadow="xs" overflowY="auto">
        {/* Logo and close button */}
        <HStack justifyContent="space-evenly" w="100%" h={HEIGHT} bg="white">
          <Image src="/trace-logo.png" />
          <IconButton
            aria-label="Slide left"
            icon={<ArrowLeftIconChakra />}
            size="xs"
            onClick={handleClickSidebarClose}
          />
        </HStack>
        <HStack justifyItems='flex-start' w='100%' >
          <Heading color='gray.500' size="sm" mb='2.5' ml='8'>{appStore.layouts.sideMenuHeading.value}</Heading>
        </HStack>
        <AppSideMenu />
      </VStack>
    </Slide>
  );

  function handleClickSidebarClose() {
    appStore.layouts.isSidebarOpen.value = false;
    appStaticStore.isCloseClicked = true;
  }
}
export { AppSidebar };
