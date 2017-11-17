import numeral from 'numeral';

export const formatCost = (number, format = '$0.00') => numeral(number).format(format);