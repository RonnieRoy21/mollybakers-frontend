import { Box, Chip } from "@mui/material";

interface FilterBarProps {
  filters: string[];

  selectedFilter: string;

  onSelect: (filter: string) => void;
}

const FilterBar = ({ filters, selectedFilter, onSelect }: FilterBarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        overflowX: "auto",
        py: 1,

        "&::-webkit-scrollbar": {
          display: "none",
        },

        scrollbarWidth: "none",
        fontSize: {
          xs: 10,
          sm: 11,
          md: 12,
          lg: 14,
          xl: 16,
        },
        backgroundColor: "burlywood",
      }}
    >
      {filters.map((filter, index) => (
        <Chip
          sx={{
            fontSize: {
              xs: 10,
              sm: 11,
              md: 12,
              lg: 14,
              xl: 16,
            },
          }}
          key={index}
          label={filter}
          clickable
          color={selectedFilter === filter ? "primary" : "default"}
          variant={selectedFilter === filter ? "filled" : "outlined"}
          onClick={() => onSelect(filter)}
        />
      ))}
    </Box>
  );
};

export default FilterBar;
