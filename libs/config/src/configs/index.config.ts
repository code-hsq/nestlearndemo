import demo from './demo.config';
import demo2 from './demo2.config';
export default () => {
  const config = {
    demo,
    demo2: demo2(),
  };
  return config;
};
