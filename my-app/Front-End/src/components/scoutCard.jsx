import React from "react";
import {Card,CardContent, CardHeader, Typography} from "@mui/material";

const ScoutCard = ({ report }) => {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    return (
        <div>
            <Card>
                <CardHeader
                    title = {report.event}
                    subheader = {report.scout}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {report.report}
                    </Typography>
                </CardContent>
            </Card>
        </div>
      
    );
  };
  
  export default ScoutCard;