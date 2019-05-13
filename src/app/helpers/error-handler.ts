export const authErrorHandler = (err: any) => {
  console.error(err);
  if (err.status === 401 && err.error.message) {
    return err.error.message;
  }

  return 'Something went wrong, please try again later.';
};
