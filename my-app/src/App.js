import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Teampage from "./scenes/teampage";
import ScoutForm from "./scenes/scoutingForm";
import Schedule from "./scenes/calendar";
import PlayerBio from "./scenes/playerBio";


function App() {
  const [theme, colorMode] = useMode();

  return ( 
    <ColorModeContext.Provider value = { colorMode }>
      <ThemeProvider theme = { theme }>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main class = "content">
            <Topbar />
            <Routes>
              <Route path = "/" element = {<Teampage/>}></Route>
              <Route path = "/scouting-form" element = {<ScoutForm/>}></Route>
              <Route path = "/schedule" element = {<Schedule/>}></Route> 
              <Route path = "/player-info" element = {<PlayerBio/>}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
