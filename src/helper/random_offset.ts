const randomOffset = (): number => {
  const randomInteger = Math.floor(Math.random() * 10);
  const result = randomInteger * 10 + 10;
  return result;
};

export default randomOffset;
