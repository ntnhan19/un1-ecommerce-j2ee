const API_URL = 'http://localhost:8080/api/public/product-collections';

const collectionService = {
  getCollections: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch collections");
    return response.json();
  },

  getCollection: async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch collection");
    return response.json();
  },

  createCollection: async (collectionData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collectionData)
    });
    if (!response.ok) throw new Error("Failed to create collection");
    return response.json();
  },

  updateCollection: async (id, collectionData) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collectionData)
    });
    if (!response.ok) throw new Error("Failed to update collection");
    return response.json();
  },

  deleteCollection: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error("Failed to delete collection");
    return true;
  }
};

export default collectionService;
