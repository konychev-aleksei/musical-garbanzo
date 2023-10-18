import SearchPage from "./pages/SearchPage/SearchPage";
import Playbar from "./components/Playbar/Playbar";
import style from "./style.module.scss";

const App = () => (
  <div className={style.wrapper}>
    <SearchPage />
    <Playbar />
  </div>
);

export default App;
