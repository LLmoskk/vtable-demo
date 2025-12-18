import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Demo1 from './pages/demo1';
import Demo2 from './pages/demo2';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Demo1 />} />
        <Route path="demo2" element={<Demo2 />} />
      </Route>
    </Routes>
  );
}

export default App;
