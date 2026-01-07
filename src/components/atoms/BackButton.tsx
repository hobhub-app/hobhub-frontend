import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Box
      as="button"
      aria-label="Go back"
      onClick={() => navigate(-1)}
      color="beige.100"
      justifyContent="start"
      alignItems="center"
    >
      <RiArrowLeftSLine size={32} />
    </Box>
  );
};

export default BackButton;
