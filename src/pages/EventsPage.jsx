import React, { useEffect, useState } from "react";
import { Text, Box, Heading, Input, Stack, Center, Spinner } from "@chakra-ui/react";
import { EventList } from "../components/EventList";
import { SearchFilter } from "../components/SearchFilter";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true); // Adding loading state

  // Fetch events and categories
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchEvents();
    fetchCategories();
  }, []);

  // Filter events based on search query and selected category
  useEffect(() => {
    if (events.length === 0) return; // Only filter if events are loaded

    let filtered = events;

    // Filter by search query (event title)
    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected category
    if (selectedCategory) {
      filtered = filtered.filter((event) =>
        event.categoryIds.includes(parseInt(selectedCategory)) // Ensure comparison is with an integer
      );
    }

    setFilteredEvents(filtered);
  }, [searchQuery, selectedCategory, events]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box margin={4}>
      <Stack spacing={4}>
        <Heading color={"white"} textAlign={"center"}>
          Event List
        </Heading>
        <Text color={"white"} textAlign={"center"} fontSize={"sm"}>
          Search for specific events, filter by category, or add a new one.
        </Text>

        {/* Search bar */}
        <Center>
          <Input
            type="text"
            placeholder="Search for a specific event..."
            _placeholder={{ color: "white" }}
            value={searchQuery}
            onChange={handleSearchChange}
            textAlign={"center"}
            w={"80%"}
            m={2}
            border={"2px"}
            borderColor={"purple.500"}
          />
        </Center>

        {/* Category filter */}
        <Center>
          <SearchFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Center>
      </Stack>

      {/* Loading state */}
      {loading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <EventList events={filteredEvents} categories={categories} />
      )}
    </Box>
  );
};
