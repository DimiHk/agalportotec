import { Textarea, Box } from "@chakra-ui/react";

export const Notes = ({ data }: any) => {
  const { notes } = data;
  return (
    <Box width={"small"} height={"small"} padding={"2"}>
      <Textarea
        fontSize={"xs"}
        fontWeight={"semibold"}
        disabled
        value={notes}
        textColor={"black"}
      />
    </Box>
  );
};
