import React from "react";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesperPage = 9;

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  const indexOfLastExercise = currentPage * exercisesperPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesperPage;
  const currentExercises = exercises
    ? exercises.slice(indexOfFirstExercise, indexOfLastExercise)
    : [];

  useEffect(() => {
    async function fetchBodyPartExercises() {
      let bodyPartExercises = [];

      if (bodyPart === "all") {
        bodyPartExercises = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises`,
          exerciseOptions
        );
      } else {
        bodyPartExercises = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }
      setExercises(bodyPartExercises);
    }
    fetchBodyPartExercises();
  }, [bodyPart]);

  return (
    <Box
      id="exercises"
      sx={{ mt: { lg: "110px" } }}
      mt="20px"
      p="10px"
      ml="30px"
    >
      <Typography variant="h3" mb="45px" p="10px">
        Showing Results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((ex, ix) => (
          <ExerciseCard key={ix} ex={ex} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > exercisesperPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesperPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
