import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';

import { Home as HomeIcon } from '@icon-park/react';
import './App.css';

function App() {
  return (
    <div>
      app
      <HomeIcon theme="outline" size="16" fill="#333" />
    </div>
  );
}

// 原始app示例代码

// function App() {
//   return (
//     <Router basename="/react">
//       <div className="app">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

export default App
