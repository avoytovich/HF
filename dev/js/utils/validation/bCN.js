/**
 * buildComplexName function to add regex in prop name for the validation of nested in array objects
 * @param arrName: {string} - array name in which we need to validate repeatable prop
 * @param propName: {string} - prop name which we need to validate - NOTE!!! WIll APPEAR AS FIRST WORD IN ERR MESSAGE
 * @return string regular expression
 *
 */
export const bCN = (arrName, propName) => {
  return `^(${arrName}(\\[|\\.)[0-9]+\\]*\\.${propName})$`;
}