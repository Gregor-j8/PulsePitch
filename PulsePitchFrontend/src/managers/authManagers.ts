import { UserProfileDTO, RegisterCredentials } from '../types';

const _apiUrl = "/api/auth";

export const login = (email: string, password: string): Promise<UserProfileDTO | null> => {
  return fetch(_apiUrl + "/login", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Authorization: `Basic ${btoa(`${email}:${password}`)}`,
    },
  }).then((res) => {
    if (res.status !== 200) {
      return Promise.resolve(null);
    } else {
      return tryGetLoggedInUser();
    }
  });
};

export const logout = (): Promise<Response> => {
  return fetch(_apiUrl + "/logout");
};

export const tryGetLoggedInUser = (): Promise<UserProfileDTO | null> => {
  return fetch(_apiUrl + "/me").then((res) => {
    return res.status === 401 ? Promise.resolve(null) : res.json();
  });
};

interface RegisterResponse {
  errors?: string[];
}

export const register = (userProfile: RegisterCredentials): Promise<UserProfileDTO | RegisterResponse> => {
  const encodedProfile = {
    ...userProfile,
    password: btoa(userProfile.password)
  };

  return fetch(_apiUrl + "/register", {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(encodedProfile),
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
