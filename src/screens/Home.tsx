import { MenuItem, Stack, TextField } from "@mui/material";
import HomeGrid from "../components/HomeGrid";
import { NavBarstyles } from "../styles/navbar";
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
          marginTop: 8,
          opacity: 1,
        }}
      >
        <Stack
          spacing={1}
          sx={{
            backgroundColor: "darkgray",
            position: "sticky",
            top: "10%",
            opacity: 1,

            zIndex: 10,
            flexDirection: {
              xs: "column-reverse",
              sm: "column-reverse",
              md: "row-reverse",
              lg: "row-reverse",
            },
          }}
        >
          <TextField
            label="category"
            sx={NavBarstyles.categoryBox}
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
          <TextField variant="outlined" label="Search..." />
        </Stack>
        <HomeGrid></HomeGrid>
      </Stack>
    </>
  );
}

export default Home;
