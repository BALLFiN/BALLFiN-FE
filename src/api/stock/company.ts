import { axiosInstance } from "@/lib/axiosInstance";

export type CompanyInfoResponse = Record<string, any>;

export const getCompanyInfoByCode = async (
  stockCode: string
): Promise<CompanyInfoResponse> => {
  const { data } = await axiosInstance.get(`/info/company/${stockCode}`);
  return data;
};
