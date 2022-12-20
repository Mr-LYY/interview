export const BASE_URL = "https://e4c0-212-175-114-43.eu.ngrok.io";

export const makeCustomFetch = (url, method = "GET", data) =>
  fetch(`${BASE_URL}/api/${url}`, {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: new Headers({
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      // "X-Question-Type": "result",
      Accept: "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    }),
  });

export const candidates = [
  {
    id: 1,
    name: "Alexey",
    lastname: "Pavluchenko",
    position: "Fullstack developer",
    stack: ["NodeJS, JS, React"],
    experience: [],
  },
  {
    id: 2,
    name: "Sergey",
    lastname: "Karpin",
    position: "Backend developer",
    stack: ["NodeJS, C, C++, Java"],
    experience: [],
  },
  {
    id: 3,
    name: "Ivan",
    lastname: "Nikitin",
    position: "Backend developer",
    stack: ["NodeJS, C, C++, Java"],
    experience: [],
  },
  {
    id: 4,
    name: "Maria",
    lastname: "Alexandrova",
    position: "Backend developer",
    stack: ["NodeJS, C, C++, Java"],
    experience: [],
  },
  {
    id: 5,
    name: "Vadim",
    lastname: "Chernishev",
    position: "Backend developer",
    stack: ["NodeJS, C, C++, Java"],
    experience: [],
  },
];
