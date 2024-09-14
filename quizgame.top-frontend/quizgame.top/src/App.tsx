import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from "./assets/components/Layout"
import Home from "./pages/Home";
import Test from "./pages/Test";
import Settings from "./pages/Settings";
 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path = "/"           element = {<Home />} />
          <Route path = "/Home"       element = {<Home />} />
          <Route path = "/Test"       element = {<Test />} />
          <Route path = "/Settings"   element = {<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;