const key = "saved-contacts"

export const getContactFromLS = () => {
  try {
    const contactList = localStorage.getItem(key);
    return contactList === null ? undefined : JSON.parse(contactList);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

export const saveContactToLS = (contacts) => {
  try {
    const contactList = JSON.stringify(contacts);
    localStorage.setItem(key, contactList);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};