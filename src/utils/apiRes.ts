export const success = (message: tring, data: any = null) => ({
  success: true,
  message,
  data,
});

export const error = (message: string, err: any = {}) => ({
  success: false,
  message,
  error: err,
});
