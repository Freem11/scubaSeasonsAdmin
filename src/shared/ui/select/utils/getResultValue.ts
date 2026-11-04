import { Option, Values } from '..';

/**
 * Prepare select value to be passed outside
 * @param value
 * @param labelInValue
 * @param isMulti
 * @returns
 */
export default function getResultValue(value: Values, labelInValue: boolean, isMulti: boolean): Option | Option[] | string | string[] | null {
  if (!value) {
    return null;
  }
  const options = Array.from(value.values());
  if (labelInValue) {
    return isMulti ? options : options[0];
  }
  const keys = options.map(option => option.key);
  return isMulti ? keys : keys[0];
}
