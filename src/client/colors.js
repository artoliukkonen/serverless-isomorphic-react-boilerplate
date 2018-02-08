const colorNames = {
  white: 'rgba(255,255,255,1)',
  black: 'rgba(68,68,70,1)',
  gray: 'rgba(155,155,155,1)',
  lightGray: 'rgba(189,189,189,1)',
  lighterGray: 'rgba(230,228,228,1)',
  lightestGray: 'rgba(246,246,246,1)',
  almostWhite: 'rgba(250,250,250,1)',
  orange: 'rgba(246,166,35,1)',
  red: 'rgba(159,40,30,1)',
  darkGreen: 'rgba(24,106,87,1)',
  lightGreen: 'rgba(122,177,49,1)',
};

function opacity(colorName, value = 1) {
  return colorNames[colorName].replace(/,\d(.\d)?\)/, `,${value})`);
}

export default {
  opacity,
  ...colorNames,
};
