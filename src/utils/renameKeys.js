function renameKeys(keysMap, obj) {
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {},
  );
}

const FIXED_REGIONES = {
  Tarapaca: 'Tarapacá',
  Valparaiso: 'Valparaíso',
  'Del Libertador General Bernardo O’Higgins': 'O’Higgins',
  Nuble: 'Ñuble',
  Biobio: 'Biobío',
  'La Araucania': 'Araucanía',
  'Los Rios': 'Los Ríos',
  Aysen: 'Aysén',
  'Magallanes y la Antartica': 'Magallanes',
};

function renameRegiones(regiones) {
  return renameKeys(FIXED_REGIONES, regiones);
}

export default { renameRegiones };
