const BASE_URL = "https://async-race-api-production-82d0.up.railway.app"

export const getCars = async (page: number, limit: number) => {
  const res = await fetch(`${BASE_URL}/garage/?_limit=${limit}&_page=${page}`, {
    method: "get",
  }).then((res) => res.json());
  return res;
};
export const getCarsCount = async () => {
  const res = await fetch(`${BASE_URL}/garage/`, { method: "get" });
  return res;
};

export const getCar = async (id: number) => {
  const res = await fetch(`${BASE_URL}/garage/${id}`, { method: "get" }).then((res) => res.json());
  return res;
};

export const removeCar = async (id: number) => {
  await fetch(`${BASE_URL}/garage/${id}`, { method: "delete" });
  const winner = await getWinner(id)
  if(Object.keys(winner).length != 0){
    deleteWinner(id);
  }
};

export const createCar = async (name: string, color: string) => {
  const res = await fetch(`${BASE_URL}/garage`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, color }),
  }).then((res) => res.json());
  return res;
};

export const updateCar = async (id: number, name: string, color: string) => {
  const res = await fetch(`${BASE_URL}/garage/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, color }),
  }).then((res) => res.json());
  return res;
};

export const toggleEngine = async (id: number, status: string) => {
  const queryParams = new URLSearchParams({ id: `${id}`, status });
  const res = await fetch(`${BASE_URL}/engine/?${queryParams}`, {
    method: "PATCH",
  });
  return res.json();
};

export const createWinner = async (id: number, wins: number, time: number) => {
  try {
    const res = await fetch(`${BASE_URL}/winners/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        wins,
        time,
      }),
    }).then((res) => res.json());
    return res;
  } catch (error) {
    console.error("Could not create winner:", error);
    return false;
  }
};

export const getWinner = async (id: number) => {
  const res = await fetch(`${BASE_URL}/winners/${id}`, {
    method: "get",
  }).then(res => res.json());
  return res;
};

export const updateWinner = async (id: number, wins: number, time: number) => {
  try {
    const res = await fetch(`${BASE_URL}/winners/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wins,
        time,
      }),
    }).then((res) => res.json());
    return res;
  } catch (error) {
    console.error("Failed to update winner:", error);
    return false;
  }
};

export const deleteWinner = async (id: number) => {
  const res = await fetch(`${BASE_URL}/winners/${id}`, {
    method: "delete",
  });
  return res;
};

export const getWinners = async (page: number, limit: number, sort: string, order: string) => {
  const res = await fetch(`${BASE_URL}/winners/?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}`, { method: "get" }).then(
    (res) => res.json()
  );
  return res;
};

export const getTotalWinners = async () => {
  const res = await fetch(`${BASE_URL}/winners`, { method: "get" }).then(
    (res) => res.json()
  );
  return res.length;
};

