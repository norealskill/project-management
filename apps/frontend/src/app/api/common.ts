export const apiHelper = (endPoint: string) => {
  const apiProtocol = 'http';
  const apiPort = 3000;
  const apiPath = 'api';
  const apiBaseURL = 'localhost';

  return `${apiProtocol}://${apiBaseURL}:${apiPort}/${apiPath}/${endPoint}`;
};
