import { Box, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from '../../components/Header.jsx';
// index.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Dummy data to determine qualification - this would come from your application logic
const customerQualifies = true; // This would be dynamically set based on some condition

const ResultsPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {customerQualifies ? (
        <div>
          <h1>Congratulations!</h1>
          <p>You have been approved.</p>
          {/* Inline SVG for checkmark */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            fill="green"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M13.485 1.929a.75.75 0 011.06 1.061l-7.75 7.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 111.06-1.06l3.22 3.22 7.22-7.22z"
            />
          </svg>
        </div>
      ) : (
        <div>
          <h1>Application Denied</h1>
          <p>We are unable to approve your application at this time.</p>
          {/* Inline SVG for cross */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            fill="red"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 11.708.708l-2.647 2.646L11.354 11l-2.647 2.646a.5.5 0 01-.708-.708L10.293 11 7.646 8.354a.5.5 0 00-.708-.708L4.646 11a.5.5 0 11-.708-.708L6.293 8.5 4.646 6.854a.5.5 0 010-.708z" />
          </svg>
          <h2>Here are some tips to improve your credit:</h2>
          <ul>
            <li>Pay your bills on time.</li>
            <li>Reduce the amount of debt you owe.</li>
            <li>Keep balances low on credit cards.</li>
            <li>Apply for new credit accounts only as needed.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={ResultsPage} />
      {/* Other routes would go here */}
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));


