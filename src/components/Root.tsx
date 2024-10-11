import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Box bg="gray.100">
      <Outlet />
    </Box>
  );
}
