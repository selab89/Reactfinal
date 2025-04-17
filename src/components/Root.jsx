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
        // URL aangepast naar de juiste poort (5190)
        const res = await fetch('http://localhost:5190/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);  // Categorieën worden in de staat gezet
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
  }, []);  // Dit wordt één keer uitgevoerd bij het laden van de pagina

  // ✨ Wanneer op "Add Event" wordt geklikt
  const handleAddEvent = () => {
    setShowModal(true);
  };

  // ❌ Sluit de modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // ✅ Opslaan van een nieuw event
  const handleSaveEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setFilteredEvents((prev) => [...prev, newEvent]);

    toast({
      title: 'Event toegevoegd',
      description: `"${newEvent.title}" is succesvol opgeslagen.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setShowModal(false);
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
          categories={categories}  // Geef de categorieën door die we hebben opgehaald
          eventData={null} // Geen bestaande eventdata omdat het een nieuw event betreft
        />
      )}
    </Box>
  );
};
