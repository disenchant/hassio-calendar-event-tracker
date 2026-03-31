const isTodayAfter = (now: Date, dropAfter: string): boolean => {
  const [ hours, minutes, seconds ] = dropAfter.split(':');

  if (now.getHours() !== Number(hours)) {
    return now.getHours() > Number(hours);
  }

  if (now.getMinutes() !== Number(minutes)) {
    return now.getMinutes() > Number(minutes);
  }

  return now.getSeconds() >= Number(seconds);
};

export {
  isTodayAfter
};
