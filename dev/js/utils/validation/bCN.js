/**
 * buildComplexName function to add regex in prop name for the validation of nested objects of any depth
 * @param args: {string} - parameters separated by coma - path to the validating parameter
 * @return string regular expression
 *
 */
export const bCN = (...args) => {
  let firstProp    = `^(` + args.shift();
  let returnString = args.reduce((acc, str, i) => acc + '\\.([0-9]\\.)*' + str, firstProp);
  returnString     = returnString +')$';
  return returnString;
};