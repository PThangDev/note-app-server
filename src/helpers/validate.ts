export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateUsername = (username: string) => {
  const regex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._@]+(?<![_.])$/g;
  return regex.test(String(username).toLocaleLowerCase());
};

export const validateAccount = (account: string) => {
  const regex = /^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i;
  return regex.test(String(account).toLocaleLowerCase());
};
