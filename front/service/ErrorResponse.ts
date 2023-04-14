const ErrorResponse = (code: number, message='', response:Array<string>=[null],hasError=false ) => {
  return {
    errorCode: code,
    errorMessage: message,
    hasError: hasError,
    response: response
  };
};
export { ErrorResponse };