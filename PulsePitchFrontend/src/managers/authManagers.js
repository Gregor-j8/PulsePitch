
const _apiUrl = "/api/auth";

export const login = (email, password) => {
  console.log(email, password)
  return fetch(_apiUrl + "/login", {
  method: "POST",
  credentials: "same-origin",
  headers: {
    Authorization: `Basic ${btoa(`${email}:${password}`)}`,
  },
})
  .then((res) => {
    if (!res.ok) {
      return null;
    }
    console.log(res)
    return res.json(); // Only call if you know it's valid JSON
  })
  .catch((err) => {
    console.error("Login failed:", err);
    return null;
  });
};

export const logout = () => {
  return fetch(_apiUrl + "/logout");
};

export const tryGetLoggedInUser = () => {
  return fetch(_apiUrl + "/me").then((res) => {
    return res.status === 401 ? Promise.resolve(null) : res.json();
  });
};

export const register = (userProfile) => {
  userProfile.password = btoa(userProfile.password);
  return fetch(_apiUrl + "/register", {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userProfile),
  }).then((res) => {
    if (res.ok) {
      return fetch(_apiUrl + "/me").then((res) => res.json());
    } else if (res.status === 400) {
      return res.json();
    } else {
      return Promise.resolve({ errors: ["Unknown registration error"] });
    }
  });
};