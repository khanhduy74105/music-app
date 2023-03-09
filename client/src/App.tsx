import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home,Public, Login, ZingChart,Album, Search, SearchSong, SearchAll, Singer, SearchPlaylist, WeekRankPage, Personal, Processing } from "./containers/public";
import {Routes, Route} from 'react-router-dom'
import path from "./utils/path";
import SongContextProvider from "./context/songContext";
import FormUser from "./components/FormUser";
function App() {
 
  return (
    <SongContextProvider>
      <div>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />}></Route>
            <Route path={path.LOGIN} element={<Login />}></Route>
            <Route path={path.PERSONAL} element={<Personal />}></Route>
            <Route path={path.RADIO} element={<Processing />}></Route>
            <Route path={path.FOLLOW} element={<Processing />}></Route>
            <Route path={path.ALBUM_TITLE_PID} element={<Album />}></Route>
            <Route path={path.PLAYLIST_TITLE_PID } element={<Album />}></Route>
            <Route path={path.CHART_TITLE_ID } element={<WeekRankPage />}></Route>
            <Route path={path.ZINGCHART_TITLE_ID } element={<ZingChart />}></Route>
            <Route path={path.CHART} element={<ZingChart />}></Route>
            <Route path={path.HOME__SINGER} element={<Singer />}></Route>
            <Route path={path.SEARCH } element={<Search />}>
              <Route path={path.ALL } element={<SearchAll/>} />
              <Route path={path.SONG } element={<SearchSong />} />
              <Route path={path.SEARCH__PLAYLIST} element={<SearchPlaylist />} />
            </Route>
            
          </Route>
        </Routes>
      </div>
      <FormUser />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </SongContextProvider>
  );
}

export default App;
