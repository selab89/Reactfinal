// Categorieën ophalen
export const eventCategories = (event, categories) => {
  if (!categories || !Array.isArray(categories)) {
    return "No categories available";
  }

  const eventCategoryIds = event.categoryIds || [];
  const eventCategoryNames = eventCategoryIds
    .map((categoryId) => {
      // Zorg ervoor dat categoryId een string is, als de categorie-ids strings zijn.
      const category = categories.find((cat) => String(cat.id) === String(categoryId));
      return category ? category.name : null;
    })
    .filter(Boolean); // Filter null of undefined categorieën

  return eventCategoryNames.length > 0
    ? eventCategoryNames.join(", ") // Maak een string met de categorieën
    : "No categories available";
};

// Datum, starttijd en eindtijd ophalen
export const eventStartDate = (event) => {
  if (!event.startTime) return "No start date available";
  return new Date(event.startTime).toDateString(); // Haal de datum van startTime op
};

export const eventStartTime = (event) => {
  if (!event.startTime) return "No start time available";
  return event.startTime.slice(11, 16); // Haal alleen het tijdstip op (uur:minuten)
};

export const eventEndTime = (event) => {
  if (!event.endTime) return "No end time available";
  return event.endTime.slice(11, 16); // Haal alleen het eindtijdstip op (uur:minuten)
};

// eventCreator ophalen
export const eventCreator = (event, users) => {
  if (!event.createdBy) return "No creator available";
  // Zorg ervoor dat beide ID's van hetzelfde type zijn voor vergelijking
  const creator = users.find((user) => user.id === Number(event.createdBy)); // Casten naar number voor vergelijking
  return creator ? creator.name : "Unknown creator"; // Return de naam van de maker
};
