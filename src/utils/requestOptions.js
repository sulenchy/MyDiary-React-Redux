const requestOptions = (body, method, authorization) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    authorization,
  },
  body: body ? JSON.stringify(body) : null
});

export default requestOptions;
