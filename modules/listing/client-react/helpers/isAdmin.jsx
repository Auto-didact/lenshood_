const isAdminFunction = role => {
  if (role === 'admin') {
    return true;
  } else {
    return false;
  }
};
export default isAdminFunction;
