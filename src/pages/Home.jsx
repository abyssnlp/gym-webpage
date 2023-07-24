import React from "react";
import { useState, useContext } from "react";
import { Box } from "@mui/material";

import Exercises from "../components/Exercises";
import HeroBanner from "../components/HeroBanner";
import SearchExercises from "../components/SearchExercises";

const Home = () => {
  const [bodyPart, setBodyPart] = useState("all");

  // Persist in session storage, the array of exercises
  // TODO: Change to use Redux
  const [exercises, setExercises] = useState(
    JSON.parse(sessionStorage.getItem("exercises")) || []
  );

  React.useEffect(() => {
    sessionStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  // 2 pages share the same state, so the states have to be declared here in the common or root page
  // useContext hook: https://www.freecodecamp.org/news/context-api-in-react/

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        exercises={exercises}
      />
    </Box>
  );
};

export default Home;
