export const isJsonStrMatch = (a: any, b: any) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const cloneDeep = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const getFileNameFromURL = (url: string) => {
  if (!url) {
    return '';
  }
  // @ts-ignore
  return url.split('?').shift().split('/').pop();
};

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
