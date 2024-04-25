import { useSubmitForm } from "@/hooks";
import { ResetPasswordEmailRequest } from "@/models";
import { resetPasswordEmailSchema } from "@/schemas";
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

export const ResetPasswordPage = () => {
  const router = useRouter();

  const toast = useToast();

  const { register, handleSubmit, errors } =
    useSubmitForm<ResetPasswordEmailRequest>(resetPasswordEmailSchema);

  async function handleSendRecoverLink(requestData: ResetPasswordEmailRequest) {
    authenticationService
      .handleSendRecoverLink(requestData)
      .then(() => {
        toast({
          title: "SUCESSO",
          description:
            "EMAIL DE RECUPERAÇÃO ENVIADO COM SUCESSO! POR FAVOR VERIFIQUE O SEU EMAIL!",
          status: "success",
        });
        router.push("/auth");
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO ENVIAR O EMAIL DE RECUPERAÇÃO! POR FAVOR TENTE NOVAMENTE!",
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
              RECUPERAR PALAVRA-PASSE
            </Heading>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Text
                fontSize={"xs"}
                width={"sm"}
                fontWeight={"bold"}
                textColor={"gray.700"}
                textAlign={"center"}
              >
                POR FAVOR, INSIRA O SEU EMAIL PARA RECUPERAR A SUA
                PALAVRA-PASSE, APOS ISSO, VERIFIQUE O SEU EMAIL E SIGA AS
                INSTRUÇÕES!
              </Text>
            </Flex>
            <Grid padding={"8"} gap={4}>
              <FormControl isInvalid={!!errors.email?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  EMAIL
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.email?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input type={"text"} {...register("email")} />
              </FormControl>
            </Grid>
          </CardBody>
          <Flex>
            <Box width={"full"}>
              <Button
                width={"full"}
                borderRadius={0}
                backgroundColor={"cyan.400"}
                borderBottomLeftRadius={"base"}
                _hover={{ backgroundColor: "cyan.500" }}
                onClick={() => router.push("/auth")}
              >
                <Text
                  fontSize={"small"}
                  fontWeight={"semibold"}
                  color={"white"}
                >
                  VOLTAR
                </Text>
              </Button>
            </Box>
            <Box width={"full"}>
              <Button
                width={"full"}
                borderRadius={0}
                borderBottomEndRadius={"base"}
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
                    RECUPERAR
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
