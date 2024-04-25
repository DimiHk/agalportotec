import { Card, Center } from "@chakra-ui/react";
import { SignInForm } from "./components/SignInForm";

export const LoginPage: React.FC = () => {
  return (
    <Center height={"full"}>
      <Card width={"lg"}>
        <SignInForm />
      </Card>
    </Center>
  );
};
