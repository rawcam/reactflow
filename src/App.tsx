import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import FlowEditorPage from './pages/FlowEditorPage';

function App() {
  return (
    <ReactFlowProvider>
      <BrowserRouter basename="/reactflow">
        <Routes>
          <Route path="/" element={<FlowEditorPage />} />
        </Routes>
      </BrowserRouter>
    </ReactFlowProvider>
  );
}

export default App;
