import { Link } from 'react-router-dom';
import { GlobalContext } from '../context';
import { useContext } from 'react';
const Home: React.FC = () => {
  const mainData = useContext(GlobalContext) as any;
  return (
    <div className="home">
      <h1>React 18子应用 - 首页cesh2</h1>
      <p>欢迎使用React 18子应用</p>
      {
        mainData.baseState && (
          <div>mainData {mainData.baseState.user.name}</div>
        )
      }
      <Link to="/about">跳转到关于页面</Link>
    </div>
  );
};

export default Home;