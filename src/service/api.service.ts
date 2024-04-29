export const getCars = async (page: number, limit: number) => {
  try {
    const res = await fetch(`http://localhost:3000/garage/?_limit=${limit}&_page=${page}`, {
      method: "get",
    }).then((res) => res.json());
    return res;
  } catch (error) {
    console.error("Failed to fetch");
  }
};

export const getCar = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/garage/${id}`, {
      method: "get",
    }).then((res) => res.json());
    return res;
  } catch (error) {
    console.error("Failed to fetch");
  }
};

export const removeCar = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/garage/${id}`, {
      method: "delete"
    }).then((res) => res.json());
    return res;
  } catch (error) {
    console.error("Failed to delete");
    return false;
  }
};

export const createCar = async (name: string, color: string) => {
  try {
    const res = await fetch(`http://localhost:3000/garage`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, color }),
    }).then((res) => res.json());
    return res;
  } catch (error) {
    console.error("Failed to fetch");
    return false;
  }
};

export const updateCar = async (id:number, name: string, color: string) => {
  try {
    const res = await fetch(`http://localhost:3000/garage/${id}`, {
      method: "put",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, color }),
    }).then((res) => res.json());
    return res;
  } catch (error) {
    console.error("Failed to fetch");
    return false;
  }
};

export const toggleEngine = async (id:number, status: string) => {
  const queryParams = new URLSearchParams({ "id": `${id}`, status });
  const res = await fetch(`http://localhost:3000/engine/?${queryParams}`, {
    method: "PATCH",
  })
  return res.json();
};
