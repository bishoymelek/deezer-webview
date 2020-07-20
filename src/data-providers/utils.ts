/* eslint-disable import/prefer-default-export */
const dpMethodResponseMapper = async (res: any): Promise<any> => {
  const { data } = res;
  return {
    data,
    success: data ? 'success' : undefined,
    error: data ? undefined : 'something went wrong',
  };
};

export { dpMethodResponseMapper };
