export const isNullOrEmpty = (value: any) => {
  // 判断是否为空
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length === 0;
  }
  return (
    value === 0 ||
    value === null ||
    value === undefined ||
    value === '' ||
    value?.length === 0
  );
};
