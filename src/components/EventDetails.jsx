import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Stack,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  eventStartDate,
  eventStartTime,
  eventEndTime,
  eventCategories,
  eventCreator,
} from "../utils/eventUtils";

export const EventDetails = ({ event, categories, users }) => {
  const creator = eventCreator(event, users);

  const fontSize = useBreakpointValue({
    base: "xs",
    sm: "sm",
    md: "md",
    lg: "md",
    xl: "md",
  });

  const creatorImageMaxWidth = useBreakpointValue({
    base: "30px",
    sm: "40px",
    md: "50px",
    lg: "50px",
    xl: "50px",
  });

  // Tijdelijke console logs voor debugging (verwijder deze zodra het werkt)
  console.log("Event Categories:", event.categoryIds);
  console.log("Categories:", categories);
  console.log("Creator Info:", creator);

  return (
    <Box>
      <Heading textAlign={"center"} mt={8} mb={4} color={"purple.600"}>
        {event.title.toUpperCase()}
      </Heading>
      <Flex
        alignItems={"center"}
        justifyContent={"space-around"}
        border={"2px"}
        borderColor={"purple.500"}
        borderRadius={"50px"}
        m={"auto"}
        w={"40%"}
        h={"auto"}
        backgroundColor={"purple.800"}
        color={"white"}
      >
        <Box m={"auto"} mb={2}>
          {/* Aangepast plaatje */}
          <Image
            src={event.image}
            alt={event.title}
            width="100%"
            height="auto"
            borderRadius="40px"
            margin={0}
          />

          <Stack spacing={3} m={"auto"} textAlign={"center"}>
            <Text
              fontSize={fontSize}
              fontWeight={"bold"}
              textAlign={"center"}
              color={"purple.500"}
            >
              {event.description ? event.description.toUpperCase() : "No description available"}
            </Text>
            <Text fontSize={fontSize} color={"white"} fontWeight="500">
              Date: {eventStartDate(event)}
            </Text>
            <Text fontSize={fontSize} color={"white"} fontWeight="500">
              Time: {eventStartTime(event)} - {eventEndTime(event)}
            </Text>
            <Text fontSize={fontSize} color={"white"} fontWeight="500">
              Categories: {eventCategories(event, categories)}
            </Text>
            <Text fontSize={fontSize} color={"white"} fontWeight="500">
              Location: {event.location || "No location available"}
            </Text>
            <Text fontSize={fontSize} color={"white"} fontWeight="500">
              Created By: {creator ? creator.name : "Unknown"}
            </Text>
            {creator && (
              <Center>
                <Image
                  src={creator.image || 'path/to/default/image.jpg'}
                  alt={creator.name}
                  style={{ maxWidth: creatorImageMaxWidth, borderRadius: "50%" }}
                  mb={2}
                />
              </Center>
            )}
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};