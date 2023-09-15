export const download = (dataStr: string, name: string) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = dataStr;
  link.click();
};
