import React, { useState, useEffect } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import AddEventModal from '../components/AddEventModal';
import { Navigation } from './Navigation';

export const Root = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  // ✅ Haal de categorieën op bij het laden van de pagina
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:3000/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Fout bij ophalen categorieën',
          description: 'Kan geen categorieën laden van de server.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchCategories();
  }, []);

  const handleAddEvent = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // ✅ Event opslaan in de database + in state
  const handleSaveEvent = async (newEvent) => {
    try {
      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error('Event kon niet worden opgeslagen in de database');
      }

      const savedEvent = await response.json();

      setEvents((prev) => [...prev, savedEvent]);
      setFilteredEvents((prev) => [...prev, savedEvent]);

      toast({
        title: 'Event toegevoegd',
        description: `"${savedEvent.title}" is succesvol opgeslagen.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setShowModal(false);
    } catch (error) {
      console.error('Fout bij opslaan event:', error);
      toast({
        title: 'Fout bij opslaan',
        description: 'Het event kon niet worden opgeslagen.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Navigation onAddEvent={handleAddEvent} />
      <Outlet />
      {showModal && (
        <AddEventModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
          categories={categories}
          eventData={null}
        />
      )}
    </Box>
  );
};
