// src/services/userService.js
const getUsers = async () => {
    const response = await fetch('/data/users.json');
    const data = await response.json();
    return data;
  };
  
  export { getUsers };
  