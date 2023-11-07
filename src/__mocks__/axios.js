const mockAxios = {
    post: jest.fn(() => Promise.resolve({ data: 'Success' })),
    get: jest.fn(() => Promise.resolve({ data: 'Mocked Data' })),
  };
  
  export default mockAxios;