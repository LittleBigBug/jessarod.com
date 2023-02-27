export const format = (str, ...args) =>
  str.replace(/{(\d+)}/g,
    (match, number) =>
      typeof args[number] != 'undefined'
        ? args[number]
        : match);

export const capitalizeFirst = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);