import React from "react";

import { Link } from "react-router-dom";
import { Button, Pagination, Stack, Typography } from "@mui/material";

const ExerciseCard = ({ ex }) => {
  return (
    <Link className="exercise-card" to={`/exercise/${ex?.id}`}>
      <img src={ex?.gifUrl} alt={ex?.name} loading="lazy" />
      <Stack direction="row">
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#ffa9a9",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {ex.bodyPart}
        </Button>
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#fcc757",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {ex.target}
        </Button>
      </Stack>
      <Typography
        ml="22px"
        color="black"
        fontWeight="bold"
        mt="12px"
        pb="10px"
        textTransform="capitalize"
        fontSize="22px"
      >
        {ex.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
