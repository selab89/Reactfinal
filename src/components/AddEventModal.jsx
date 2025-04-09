import React, { useState, useEffect } from 'react';

const AddEventModal = ({ categories, onSave, eventData }) => {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Vul de velden met de huidige event data als we een event bewerken
    useEffect(() => {
        if (eventData) {
            setEventTitle(eventData.title);
            setEventDescription(eventData.description);
            setEventLocation(eventData.location);
            setEventStartTime(eventData.startTime);
            setEventEndTime(eventData.endTime);
            setSelectedCategories(eventData.categoryIds || []);
        }
    }, [eventData]);

    // Deze functie wordt aangeroepen wanneer de gebruiker op de opslaan-knop klikt
    const handleSave = () => {
        // Controleer of alle velden zijn ingevuld
        if (!eventTitle || !eventDescription || !eventLocation || !eventStartTime || !eventEndTime) {
            alert('Please fill in all fields');
            return;
        }

        const newEvent = {
            title: eventTitle,
            description: eventDescription,
            location: eventLocation,
            startTime: eventStartTime,
            endTime: eventEndTime,
            categoryIds: [...new Set(selectedCategories)], // Verwijder duplicaten
        };

        // Sla het evenement op door de onSave-functie aan te roepen
        onSave(newEvent);
    };

    // Functie om de categorieën bij te werken wanneer een checkbox wordt ingeschakeld/uitgeschakeld
    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(categoryId)) {
                // Verwijder de categorie als deze al is geselecteerd
                return prevSelectedCategories.filter((id) => id !== categoryId);
            } else {
                // Voeg de categorie toe als deze nog niet is geselecteerd
                return [...prevSelectedCategories, categoryId];
            }
        });
    };

    return (
        <div className="modal">
            <h2>{eventData ? 'Edit Event' : 'Add New Event'}</h2>
            <form>
                <div>
                    <label htmlFor="eventTitle">Event Title</label>
                    <input
                        id="eventTitle"
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="eventDescription">Event Description</label>
                    <textarea
                        id="eventDescription"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="eventLocation">Location</label>
                    <input
                        id="eventLocation"
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="eventStartTime">Start Time</label>
                    <input
                        id="eventStartTime"
                        type="datetime-local"
                        value={eventStartTime}
                        onChange={(e) => setEventStartTime(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="eventEndTime">End Time</label>
                    <input
                        id="eventEndTime"
                        type="datetime-local"
                        value={eventEndTime}
                        onChange={(e) => setEventEndTime(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Select Categories:</h3>
                    {/* Loop over de categorieën en maak checkboxen */}
                    {categories.map((category) => (
                        <div key={category.id}>
                            <input
                                type="checkbox"
                                id={`category-${category.id}`}
                                value={category.id}
                                checked={selectedCategories.includes(category.id)} // Controleer of de categorie geselecteerd is
                                onChange={() => handleCategoryChange(category.id)} // Update de geselecteerde categorieën
                            />
                            <label htmlFor={`category-${category.id}`}>{category.name}</label>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={handleSave}>
                    Save Event
                </button>
            </form>
        </div>
    );
};

export default AddEventModal;
