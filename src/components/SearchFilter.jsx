import React from "react";
import { RadioGroup, Radio, Stack } from "@chakra-ui/react";

export const SearchFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleCategoryChange = (value) => {
    setSelectedCategory(value ? value.toString() : "");
  };

  return (
    <RadioGroup onChange={handleCategoryChange} value={selectedCategory}>
      <Stack direction="row" wrap="wrap" spacing={4} justify="center">
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
