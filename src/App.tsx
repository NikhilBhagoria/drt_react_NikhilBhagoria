import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Dashboard } from './pages/Dashboard';
import { SelectedObjects } from './pages/SelectedObjects';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/selected" element={<SelectedObjects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;