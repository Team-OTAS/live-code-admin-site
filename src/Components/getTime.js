const getTime = (times) => {
  const date = new Date(times);
  const localDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return localDate;
};

export default getTime;
