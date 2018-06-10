export const parseResponse = (params) => {
  const { status, message, extData } = params;
  const count = (extData && extData.count) || 0;
  const data = (extData && extData.data) || [];

  return {
    status,
    message,
    count,
    data,
  };
};
