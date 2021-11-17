/**
 * Return a random string with customized length
 * or a random length in range 4-8
 * @param length :number or blank
 * @returns string
 */
export const getRandomString = (length?: number): string => {
  if (!length) {
    length = 4 + Math.random() * 4;
  }

  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Remove accents for string formated in Vietnamese
 * @param char string: need to be formated
 * @returns string: output
 */
export const removeVietnameseAccent = (char: string): string => {
  char = char.toLowerCase();
  char = char.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  char = char.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  char = char.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  char = char.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  char = char.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  char = char.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  char = char.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  char = char.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  char = char.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return char;
};

/**
 * Generate slug for string (includes Vietnamese string)
 * @param char string: input string
 * @param postfix string?: optional postfix after slug (example id)
 * @returns string: slug
 */
export const slugify = (char: string, postfix: string | number): string => {
  char = removeVietnameseAccent(char);
  char = char.replace(/^\s+|\s+$/g, ''); // trim
  char = char
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  if (postfix) char += `-${postfix}`;

  return char;
};

/**
 * Convert DTO object to new identified type object
 * @param dto any: input dto
 * @param obj any: object need to be converted
 * @returns void
 */
export const convertDTO = (dto: any, obj: any): void => {
  for (const [key, value] of Object.entries(dto)) {
    obj[key] = value;
  }
};
