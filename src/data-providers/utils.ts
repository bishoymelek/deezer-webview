const dpMethodResponseMapper = async (res: any): Promise<any> => {
  // console.log(res);
  const { data } = res;

  return {
    data,
    success: data ? 'success' : undefined,
    error: data ? undefined : 'something went wrong',
  };
};

export { dpMethodResponseMapper };
