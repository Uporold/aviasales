export const getDeclOfNum = (length) => {
  switch (true) {
    case length === 1:
      return `${length} пересадка`;
    case length >= 2 && length <= 4:
      return `${length} пересадки`;
    default:
      return `${length} пересадок`;
  }
};

const addZero = (number) => {
  const string = String(number);
  const length = string.length;
  return length < 2 ? "0" + string : string;
};

export const getTicketTimes = (date, duration) => {
  const formattedDate = new Date(date);
  const startHours = addZero(formattedDate.getHours());
  const startMinutes = addZero(formattedDate.getMinutes());
  const durationHours = addZero(Math.floor(duration / 60));
  const durationMinutes = addZero(duration % 60);
  formattedDate.setHours(formattedDate.getHours() + durationHours);
  formattedDate.setMinutes(formattedDate.getMinutes() + durationMinutes);
  const endHours = addZero(formattedDate.getHours());
  const endMinutes = addZero(formattedDate.getMinutes());
  return {
    startHours,
    startMinutes,
    durationHours,
    durationMinutes,
    endHours,
    endMinutes,
  };
};
