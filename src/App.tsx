import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FlowEditorPage from './pages/FlowEditorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlowEditorPage />} />
        <Route path="/flow-editor" element={<FlowEditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
