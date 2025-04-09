import React from "react";
import { RadioGroup, Radio, Stack } from "@chakra-ui/react";

export const SearchFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  // Zorg ervoor dat de selectedCategory altijd een string is
  const handleCategoryChange = (value) => {
    setSelectedCategory(value ? value.toString() : "");  // Zet de waarde om naar string of leeg voor 'All'
  };

  return (
    <RadioGroup onChange={handleCategoryChange} value={selectedCategory}>
      <Stack direction="row">
        <Radio value="">All</Radio>
        {categories.map((category) => (
          <Radio key={category.id} value={category.id.toString()}>
            {category.name.toUpperCase()}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};
