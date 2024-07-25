export const fetchAlltheData = async () => {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("could not fetch a data from database");
  }

  return resData.places;
};

export const fetchUserData = async () => {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("could not fetch user data from database");
  }

  return resData.places;
};

export const updateData = async (places) => {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update the user Data");
  }

  return resData.message;
};
