import MyToastContainer from './components/ui/toast/MyToastContainer';
import MainProvider from './main-provider/MainProvider';
import AppRouter from './router/AppRouter';
import './styles/global.scss'
import './styles/react-select.scss'

function App() {
  return (
    <div className="App">
      <MainProvider>
        <AppRouter />
        <MyToastContainer />
      </MainProvider>
    </div>
  );
}

export default App;
