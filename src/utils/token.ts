export const setToken = (token: string) => {}; //localStorage.setItem("token", token);
export const getToken = () => {
   return "";
   //const token = localStorage.getItem("token");
   // return token ? "Bearer " + token : "";
};
export const clearToken = () => localStorage.clear();
