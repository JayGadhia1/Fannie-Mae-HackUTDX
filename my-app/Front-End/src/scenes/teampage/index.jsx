import { Box, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import teamData from "../../data/miamiHeat.json";
import Header from '../../components/Header.jsx';


const Homepage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        {field: "nbaId", headerName: "NBA ID"},
        {field: "name", headerName: "Name", cellClassName: "name-column--cell"},
        {field: "age", headerName: "Age"},
        {field: "ppg", headerName: "PPG"},
        {field: "ast", headerName: "AST"},
        {field: "blk", headerName: "BLK"},
        {field: "reb", headerName: "REB"},
        {field: "stl", headerName: "STL"},
        {field: "ft%", headerName: "FT%"},
        {field: "fta", headerName: "FTA"},
        {field: "ftm", headerName: "FTM"},
        {field: "fg%", headerName: "FG%"},
        {field: "fga", headerName: "FGA"},
        {field: "fgm", headerName: "FGM"},
        {field: "pf", headerName: "PF"},
        {field: "oreb", headerName: "OREB"},
        {field: "dreb", headerName: "DREB"},
    ];

    return <Box m = "20px">
        <Box display = "flex" justifyContent="start" allignItems = "center">
            <Header title = "TEAM STATISTICS" subtitle = "Currently displaying Miami Heat Data"/>
        </Box>
        <Box m = "40px 0 0 0" height = "75vh" sx = {{
                "& .MuiDataGrid-root": {
                    border: "none"
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none"
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: colors.blueAccent[700],
                    borderTop: "none"
                },
            }}>
                <DataGrid 
                    rows = {teamData.boxScorePerGame}
                    columns = {columns}
                    getRowId={(row) => row.nbaId}
                />
            </Box>
    </Box>
}

export default Homepage;