export default () => {
  return {
    jwt: {
      expires_in: 604800, // 7天
      secret: 'your-secret-key',
    },
  };
};
