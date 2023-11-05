import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import InfoForm from "./scenes/infoForm";
import Results from "./scenes/results";



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
              <Route path = "/" element = {<InfoForm/>}></Route>
              <Route path = "/results" element = {<Results/>}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
