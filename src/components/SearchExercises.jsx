import React from "react";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { fetchData, exerciseOptions } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

/**
 * justifyContent -> main axis
 * align-items -> secondary axis or cross axis
 *
 * justifyContent -> flex-start, flex-end, center, space between, space-around, space-evenly
 * alignItems -> flex-end, flex-start, center, baseline
 *
 *  flexDirection -> column (default: row)
 *
 *  By default, flex items try to stick in one line
 *  Wrap -> flexWrap: nowrap, wrap
 *  alignContent: (same as justifyContent)
 *
 *  gap: 10px (between items)
 *
 *  flexGrow: 1(unitless, proportion, grows if it can in the parent)
 *  flexShrink: 0 (shrink when we reduce screen size or space)
 *
 *  flex(shorthand for grow, shrink, basis): 1
 *
 *  alignSelf: center (override the container property, set at item level)
 *
 * @returns
 */

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      setBodyParts(["all", ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []); // only at the start

  return (
    <Stack alignItems="center" justifyContent="center" p="20px">
      <Typography
        gutterBottom
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value.toLowerCase());
          }}
          placeholder="Search Exercises"
          type="text"
          sx={{
            borderRadius: "40px",
            p: "10px",
            width: { lg: "900px", xs: "350px" },
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            backgroundColor: "white",
          }}
        />
        <IconButton
          type="submit"
          sx={{ position: "relative", top: "15px", right: "55px", p: "10px" }}
          onClick={async (event) => {
            event.preventDefault();

            if (searchTerm) {
              const exercisesData = await fetchData(
                `https://exercisedb.p.rapidapi.com/exercises`,
                exerciseOptions
              );

              const searchedExercises = exercisesData.filter(
                (ex) =>
                  ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  ex.bodyPart
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  ex.equipment.toLowerCase().includes(searchTerm.toLowerCase())
              );
              setSearchTerm("");
              setExercises(searchedExercises);
            }
          }}
        >
          <Search />
        </IconButton>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
