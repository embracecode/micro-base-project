import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="about">
      <h1>React 18子应用 - 关于页面</h1>
      <p>这是React 18子应用的关于页面</p>
      <Link to="/">返回首页</Link>
    </div>
  );
};

export default About;