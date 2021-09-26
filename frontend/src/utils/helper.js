export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const sliceString = (value, number = 50) => {
  if (!value) return null;
  if (value < number) return value;
  return value.substring(0, number) + '...';
};
