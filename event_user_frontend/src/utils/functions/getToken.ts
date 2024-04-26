export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found in local storage");
  }
  return token;
};
