import './App.css';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import ProjectView from './components/ProjectView';

function App() {
  return (
    <>
      <Header />
      <MainContainer>
        <ProjectView />
      </MainContainer>
    </>
  );
}

export default App;
