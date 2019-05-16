export const authErrorHandler = (err: any) => {
  console.error(err);
  if (/(401|400)/.test(err.status) && err.error.message) {
    return err.error.message;
  }

  return 'Something went wrong, please try again later.';
};
