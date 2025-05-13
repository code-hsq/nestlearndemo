import Demo2Config from './demo2.config';
export default async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'demo3',
        version: '1.0.0',
        demo2: Demo2Config(),
      });
    }, 2000);
  });
};
