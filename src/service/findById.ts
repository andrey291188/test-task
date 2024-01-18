import { DataType } from "./types";

export const findByIdProfile = (id: string, data: DataType[]) => {
  const [filteredData] = data.filter((item) => item.accountId === id);

  return filteredData;
};

export const findByIdCompaign = (id: string, data: DataType[]) => {
  const [{ profile }] = data.filter((item) =>
    item.profile.some((item) => item.profileId === id)
  );
  const [ item ] = profile.filter((item) => item.profileId === id);

  return item;
};
