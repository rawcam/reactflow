import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FlowEditorPage from './pages/FlowEditorPage';

function App() {
  return (
    <BrowserRouter basename="/reactflow">
      <Routes>
        <Route path="/" element={<FlowEditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
