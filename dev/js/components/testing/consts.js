export const languages = [
  { value: 1, label: 'English'},
  { value: 2, label: 'Swedish'},
];

export const measurements = [
  { value: 1, label: 'Metric'},
  { value: 2, label: 'U.S. units'},
];

export const sex = [
  { value: 1, label: 'Male'},
  { value: 2, label: 'Female'},
  { value: 3, label: 'Transgender'},
];

export const painType = [
  { value: 'stabbing', label:  'Stabbing' },
  { value: 'aching_dull', label:  'Aching or dull' },
  { value: 'radiating', label:  'Radiating' },
  { value: 'nagging', label:  'Nagging' },
  { value: 'burning', label:  'Burning' },
  { value: 'other',  label:  'Other' },
];

const pregnant = [
  { value: 1, label:  'Yes' },
  { value: 2, label:  'No' },
];

export const diagnosConsts = {
  languages,
  measurements,
  sex,
  painType,
  pregnant,
};
