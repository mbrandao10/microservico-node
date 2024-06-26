export const generateIdentity = ({ name }: { name: string }): string => {
  const identity = name.toLowerCase().replace(/ /g, "");
  return `${identity}`;
};
