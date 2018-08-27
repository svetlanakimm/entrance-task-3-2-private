export default function ratesSplit(rates) {
  const HOURS = 24;
  let splitted = {};

  for (let i = 0; i < HOURS; i++) {
    for (let j = 0; j < rates.length; j++) {

      let currentFrom = rates[j].from;
      let currentTo = rates[j].to;

      if (currentFrom < currentTo) {

        if ((i >= currentFrom) && (i < currentTo)) {
          splitted[i] = rates[j].value;
        }
      }

      if (currentFrom > currentTo) {

        if ((i >= currentFrom) && (i < HOURS)) {
          splitted[i] = rates[j].value;
        }

        if ((i >= 0) && (i < currentTo)) {
          splitted[i] = rates[j].value;
        }
      }

      if (currentFrom === currentTo) {
        splitted[i] = rates[j].value;
      }
    }
  }

  return splitted;
}
