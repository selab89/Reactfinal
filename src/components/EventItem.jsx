import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Image, Text } from "@chakra-ui/react";
import {
  eventStartDate,
  eventStartTime,
  eventEndTime,
  eventCategories,
} from "../utils/eventUtils";

export const EventItem = ({ event, categories }) => {
  return (
    <Link to={`/event/${event.id}`}>
      <Flex
        mt={4}
        alignItems="center"
        justifyContent={"space-evenly"}
        backgroundColor="purple.800"
        p={4}
        h={200}
        border="2px"
        borderColor="purple.900"
        borderRadius={8}
        transition="transform 0.5s"
        _hover={{
          cursor: "pointer",
          transform: "scale(1.05)",
        }}
      >
        {/* Afbeelding met fallback als de afbeelding niet beschikbaar is */}
        <Image
          src={event.image || '/images/default-image.jpg'}  // Vervang door een geldige fallback afbeelding
          alt={event.title}
          boxSize="120px"
          mr={4}
          borderRadius={"50%"}
        />
        <Box
          fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl", xl: "2xl" }}
          textAlign={"center"}
        >
          <Text color="purple.600" fontWeight="bold">
            {event.title.toUpperCase()}
          </Text>
          {/* Beschrijving met fallback voor lege beschrijving */}
          <Text color="white" fontWeight="bold">
            {event.description ? event.description : "No description available"}
          </Text>
          <Text color="white" fontWeight="500">
            Date: {eventStartDate(event)}  {/* Event start date */}
          </Text>
          <Text color="white" fontWeight="500">
            Time: {eventStartTime(event)} - {eventEndTime(event)}  {/* Event start and end time */}
          </Text>
          <Text color="white" fontWeight="500">
            Categories: {eventCategories(event, categories).toUpperCase()}  {/* Event categories */}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};
