import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  CheckboxGroup,
  Stack,
  useToast
} from '@chakra-ui/react';

const AddEventModal = ({ isOpen, onClose, onSave, eventData, categories }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toast = useToast();

  // ✅ Vul data in bij edit
  useEffect(() => {
    if (eventData) {
      setEventTitle(eventData.title);
      setEventDescription(eventData.description);
      setEventLocation(eventData.location);
      setEventStartTime(eventData.startTime);
      setEventEndTime(eventData.endTime);
      setSelectedCategories(eventData.categoryIds || []);
    } else {
      setEventTitle('');
      setEventDescription('');
      setEventLocation('');
      setEventStartTime('');
      setEventEndTime('');
      setSelectedCategories([]);
    }
  }, [eventData, isOpen]);

  const handleSave = () => {
    if (!eventTitle || !eventDescription || !eventLocation || !eventStartTime || !eventEndTime) {
      toast({
        title: 'All fields are required!',
        description: 'Please fill in all fields before saving.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newEvent = {
      title: eventTitle,
      description: eventDescription,
      location: eventLocation,
      startTime: eventStartTime,
      endTime: eventEndTime,
      categoryIds: [...new Set(selectedCategories)],
    };

    onSave(newEvent);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{eventData ? 'Edit Event' : 'Add New Event'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired mb={4}>
            <FormLabel>Event Title</FormLabel>
            <Input
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Event Description</FormLabel>
            <Textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="Enter event description"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Event Location</FormLabel>
            <Input
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              placeholder="Enter event location"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Start Time</FormLabel>
            <Input
              type="datetime-local"
              value={eventStartTime}
              onChange={(e) => setEventStartTime(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>End Time</FormLabel>
            <Input
              type="datetime-local"
              value={eventEndTime}
              onChange={(e) => setEventEndTime(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Select Categories</FormLabel>
            <CheckboxGroup
              colorScheme="purple"
              value={selectedCategories}
              onChange={setSelectedCategories}
            >
              <Stack spacing={3} direction="column">
                {categories.map((category) => (
                  <Checkbox key={category.id} value={category.id}>
                    {category.name}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            {eventData ? 'Save Changes' : 'Add Event'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEventModal;
