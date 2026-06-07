import { MenuItem, Stack, TextField } from "@mui/material";
import HomeGrid from "../components/HomeGrid";
import { useState } from "react";

function Home() {
  const categoryList: string[] = [
    "cakes",
    "bread",
    "muffins",
    "asian",
    "custom",
  ];
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const c = e.target.value;
    setSelectedCategory(c);
    console.log(c);
  };
  return (
    <>
      <Stack
        sx={{
          backgroundColor: "skyblue",
          opacity: 1,
        }}
      >
        <Stack
          spacing={1}
          sx={{
            backgroundColor: "whitesmoke",
            position: "sticky",
            top: 0,
            opacity: 1,
            zIndex: 10,
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
            },
          }}
        >
          <TextField
            label="category"
            sx={{ height: "fit-content", backgroundColor: "darkgrey" }}
            select
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categoryList.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ height: "fit-content", backgroundColor: "darkgrey" }}
            variant="outlined"
            label="Search..."
          />
        </Stack>
        <HomeGrid></HomeGrid>
      </Stack>
    </>
  );
}

export default Home;
