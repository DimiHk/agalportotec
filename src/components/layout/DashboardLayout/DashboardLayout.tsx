import { SideMenu } from "@/components/components/SideMenu/SideMenu";
import { Flex, Box } from "@chakra-ui/react";
import { ComponentType, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: Props) => {
  return (
    <Box width={"full"} height={"full"}>
      <Flex width={"full"} height={"full"} gap={1}>
        <SideMenu />
        <Box width={"full"} height={"full"} padding={"0.5rem"}>
          <Box
            width={"full"}
            height={"full"}
            padding={"1rem"}
            backgroundColor={"white"}
            shadow={"base"}
            borderRadius={"base"}
          >
            <Flex
              gap={2}
              width={"full"}
              height={"full"}
              direction={"column"}
              overflow={"auto"}
              position={"relative"}
            >
              {children}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export const withDashboardLayout = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const WithDashboardLayout: React.FC<P> = (props) => (
    <DashboardLayout>
      <WrappedComponent {...props} />
    </DashboardLayout>
  );
  return WithDashboardLayout;
};
