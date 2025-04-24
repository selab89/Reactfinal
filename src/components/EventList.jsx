import React from "react";
import { Grid } from "@chakra-ui/react";
import { EventItem } from "./EventItem";

export const EventList = ({ events, categories }) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)", // 1 kolom op mobiele schermen
        sm: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(2, 1fr)",   // iets behoudender
        xl: "repeat(3, 1fr)",   // maximaal 3 kolommen zelfs op groot scherm
      }}
      gap={6}
      m={4}
    >
      {events.map((event) => (
        <EventItem event={event} categories={categories} key={event.id} />
      ))}
    </Grid>
  );
};
