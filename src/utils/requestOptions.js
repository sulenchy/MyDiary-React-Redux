const requestOptions = (body, method, token) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    token,
  },
  body: body ? JSON.stringify(body) : null
});

export default requestOptions;
