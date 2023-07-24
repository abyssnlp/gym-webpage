import React from "react";

import { useParams, useSearchParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

const Testing = () => {
  const { category, id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Box p="40px">
      <Typography variant="h2" size="large" fontWeight={400}>
        Testing {category} and id: {id} and type: {searchParams.get("type")}
      </Typography>
    </Box>
  );
};

export default Testing;
