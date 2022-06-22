import checkResponse from './checkResponse';

const BASE_URL = 'https://register.nomoreparties.co';

export const token = localStorage.getItem('token');

export const register = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  });
  return checkResponse(res);
};

export const authorize = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await checkResponse(res);
  if (data.token) {
    localStorage.setItem('token', data.token);
    return data;
  }
};

export const checkToken = async (token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await checkResponse(res);
  return data;
};
