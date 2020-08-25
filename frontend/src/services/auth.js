export const TOKEN_KEY = "managament-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token, _id) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("_idUser", _id);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY, "_idUser");
};
