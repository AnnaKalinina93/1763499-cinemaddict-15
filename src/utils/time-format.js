export const transformTime = (allMinutes) => {
  const hours = Math.floor(allMinutes / 60);
  const minutes = allMinutes % 60;
  return `${hours} h ${minutes} m`;
};
