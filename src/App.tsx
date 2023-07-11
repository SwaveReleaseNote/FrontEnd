import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gnb from './components/gnb/gnb.tsx';
import Project from './pages/project.tsx';
import SearchResult from './pages/searchResult.tsx'
import CreateProject from './pages/createProject.tsx'
import ProjectDashboard from './pages/projectDashboard.tsx';
import Test from './pages/test.tsx'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div style={{width:"100%",minHeight:"100vh",height:"auto"}}>
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/project" element={<Project />} />
            <Route path="/searchResult" element={<SearchResult />} />
            <Route path="/createProject" element={<CreateProject />} />
            <Route path="/project/dashboard" element={<ProjectDashboard />} />
          </Routes>
        </div>
        <Gnb />

      </BrowserRouter>
    </div>
  );
}

export default App;
