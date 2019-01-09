const checkTime = (arg) => {
  if (arg < 10) { arg = `0${arg}`; } // add zero in front of numbers < 10
  return arg;
};

const startTime = () => {
  const today = new Date();
  const hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  min = checkTime(min);
  sec = checkTime(sec);
  setTimeout(startTime, 500);
  return `${hour}:${min}:${sec}`;
};

export default startTime;
