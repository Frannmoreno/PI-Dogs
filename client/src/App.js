import './App.css';
import { Route, Switch, BrowserRouter} from "react-router-dom";
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail'
import DogCreate from './Components/DogCreate/DogCreate';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/home/:id' component={Detail}/>
        <Route exact path='/create' component={DogCreate}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
