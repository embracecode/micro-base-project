import { Link } from 'react-router-dom';
// import { GlobalContext } from '../context';
// import { useContext, useEffect } from 'react';

const About: React.FC = () => {
  // const { setGlobalState } = useContext(GlobalContext);

  // useEffect(() => {
  //   // 组件挂载后，再修改全局状态
  //   if (setGlobalState) {
  //     setGlobalState({
  //       test: '来自 React 18 子应用的全局状态',
  //       name: 'React 18 子应用'
  //     });
  //   }
  // }, [setGlobalState]);
  return (
    <div className="about">
      <h1>React 18子应用 - 关于页面</h1>
      <p>这是React 18子应用的关于页面</p>
      <Link to="/">返回首页</Link>
    </div>
  );
};

export default About;