import Home from "./pages/Home";
import Test from "./pages/Test";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Test" element={<Test />} />
        {/*<Route path="/" element={< />}/>
        <Route path="/" element={< />}/>
        <Route path="/" element={< />}/>
        <Route path="/" element={< />}/>*/}
      </Routes>
    </Router>
  );
}

export default App;