import { useSubmitForm } from "@/hooks";
import { ResetPasswordRequest } from "@/models";
import { resetPasswordSchema } from "@/schemas";
import { authenticationService } from "@/services";
import {
  Center,
  Card,
  CardBody,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Grid,
  Text,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { faEnvelope } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";

export const RecoverAccountPage = () => {
  const router = useRouter();

  const { id: token } = router.query;

  const toast = useToast();

  const { register, handleSubmit, errors } =
    useSubmitForm<ResetPasswordRequest>(resetPasswordSchema);

  async function handleSendRecoverLink(requestData: ResetPasswordRequest) {
    authenticationService
      .handleUpdatePassword(token as string, requestData)
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "PALAVRA-PASSE ATUALIZADA COM SUCESSO!",
          status: "success",
        });
        router.push("/auth");
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO ATUALIZAR A PALAVRA-PASSE! POR FAVOR TENTE NOVAMENTE!",
          status: "error",
        });
      });
  }

  return (
    <Center height={"full"}>
      <Card width={"lg"}>
        <form onSubmit={handleSubmit(handleSendRecoverLink)}>
          <CardBody>
            <Heading
              fontSize={"2xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              marginBottom={"4"}
            >
              RECUPERAR CONTA
            </Heading>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Text
                fontSize={"xs"}
                width={"sm"}
                fontWeight={"bold"}
                textColor={"gray.700"}
                textAlign={"center"}
              >
                POR FAVOR, INSIRA A NOVA PALAVRA PASSE PARA A SUA CONTA. APOS
                SERA REDIRECIONADO PARA A PAGINA DE LOGIN EM QUE PODERA ACEDER A
                CONTA COM A NOVA PASSWORD.
              </Text>
            </Flex>
            <Grid padding={"8"} gap={4}>
              <FormControl isInvalid={!!errors.newPassword?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOVA PALAVRA-PASSE
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.newPassword?.message
                        ?.toString()
                        .toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input type={"password"} {...register("newPassword")} />
              </FormControl>
              <FormControl
                isInvalid={!!errors.newPasswordConfirmation?.message}
              >
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  CONFIRMAR PALAVRA-PASSE
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.newPasswordConfirmation?.message
                        ?.toString()
                        .toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input
                  type={"password"}
                  {...register("newPasswordConfirmation")}
                />
              </FormControl>
            </Grid>
          </CardBody>
          <Flex>
            <Box width={"full"}>
              <Button
                width={"full"}
                borderRadius={0}
                borderBottomEndRadius={"base"}
                borderBottomStartRadius={"base"}
                backgroundColor={"blue.400"}
                _hover={{ backgroundColor: "blue.500" }}
                type="submit"
              >
                <Flex justify={"center"} align={"center"} gap={2}>
                  <Text
                    fontSize={"small"}
                    fontWeight={"semibold"}
                    color={"white"}
                  >
                    RECUPERAR CONTA
                  </Text>
                  <FontAwesomeIcon icon={faEnvelope} color="white" />
                </Flex>
              </Button>
            </Box>
          </Flex>
        </form>
      </Card>
    </Center>
  );
};
