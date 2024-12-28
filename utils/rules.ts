export const regex = {
  numbers: /^\d+$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  letters: /([a-zA-Zа-яА-ЯәғқңөұүһіӘҒҚҢӨҰҮҺІ'-]+)/,
  time: /^([0-9]+):([0-9]+):([0-5][0-9])$/,
  fullName: /^([A-ZА-ЯӘҒҚҢӨҰҮҺІ][a-zA-Zа-яА-ЯәғқңөұүһіӘҒҚҢӨҰҮҺІ'-]+)\s([A-ZА-ЯӘҒҚҢӨҰҮҺІ][a-zA-Zа-яА-ЯәғқңөұүһіӘҒҚҢӨҰҮҺІ'-]+)$/,
};

export const rules = {
  requiredText: (v: any) => !!v || 'Поле обязательно к заполнению',
  requiredNumber: (v: any) => typeof v === 'number' || 'Поле обязательно к заполнению',
} as const;

export const mask = {
  phone: '+7 (7##) ### ## ##',
  date: '##.##.####',
  time: '##:##:##',
};
