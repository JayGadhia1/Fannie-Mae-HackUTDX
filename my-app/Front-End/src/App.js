import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import ScoutForm from "./scenes/scoutingForm";



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
              <Route path = "/scouting-form" element = {<ScoutForm/>}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
