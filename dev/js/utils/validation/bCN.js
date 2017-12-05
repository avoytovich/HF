/**
 * buildComplexName function to add regex in prop name for the validation of nested in array objects
 * @param arrName: {string} - array name in which we need to validate repeatable prop
 * @param propName: {string} - prop name which we need to validate
 * @return RegExp regular expression
 *
 */
export const bCN = (arrName, propName) => {
  return new RegExp(`^(${arrName}\\[[0-9]+\\]\\.${propName})$`);
}