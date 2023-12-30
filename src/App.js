import React, { useState, useEffect } from 'react';
import PieChartComponent from './PieChartComponent';
import BarChat from './BarChartComponent';
import { mockData } from './mock';
import { getBarChatdata } from './mapper';
import moment from 'moment';
import { Container, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, CircularProgress } from '@mui/material';

const App = () => {
  const [selectedValue, setSelectedValue] = useState('default'); // Initial value for dropdown
  const [loading, setLoading] = useState(true); // Loading state for API request
  const [apiRes, setApiRes] = useState([]); // State to store API response
  const apiData = mockData.exchanges;
const mappedData = getBarChatdata(apiData);
console.log(mappedData, 'mapped****')
const formatDate=(timestamp)=>{
return moment(timestamp).format('MMM DD, YYYY, h:mm:ss A');
}
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      // Replace the following URL with your actual API endpoint
      const apiUrl = `https://example-svc.development/actuator/httpexchanges`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      setApiRes(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [selectedValue]);
  const getBackgroundColor = (statusCode) => {
    switch (statusCode) {
      case 200:
        return 'green';
      case 404:
        return 'blue';
      case 400:
        return 'orange';
      case 500:
        return 'red';
      default:
        return 'white';
    }
  };
  return (
    <Container>
 <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: 'lightgray' }}>
            <Typography variant="h5" gutterBottom>
              Select API
            </Typography>
            <Select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              style={{ minWidth: '120px' }}
            >
              <MenuItem value="default" disabled>
                Select
              </MenuItem>
              <MenuItem value="example-svc.development">example-svc.development</MenuItem>
              <MenuItem value="example1-svc.development">example1-svc.development</MenuItem>
              {/* Add more options based on your requirements */}
            </Select>
          </Paper>
        </Grid>
        {loading && (
          <Grid item xs={12} textAlign={'center'} marginTop={'10rem'}>
            <CircularProgress />
          </Grid>
        )}
        {!loading && (<>
      <Grid container spacing={3} justifyContent="center" sx={{paddingTop:'2rem'}}>
        {mappedData.map((status, index) => (
          <Grid key={index} item xs={12} md={3}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor:status.color }}>
              <Typography variant="h5" gutterBottom color={'white'}>
                {status.label} Response
              </Typography>
              <Typography variant="h3" style={{ color: 'white' }} gutterBottom>
                {status.value}
              </Typography>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>
              Bar Chart
            </Typography>
            <BarChat data={mappedData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>
              Pie Chart
            </Typography>
            <PieChartComponent data={mappedData} />
          </Paper>
        </Grid>
      </Grid>
      <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '20px' }}>
        Data Table
      </Typography>
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Time Stamp</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Time Taken</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>URI</TableCell>
              {/* <TableCell>Other Data</TableCell> */}
              {/* Add more table header cells based on your actual data */}
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{formatDate(row.timestamp)}</TableCell>
                <TableCell>{row.request.method}</TableCell>
                <TableCell>{parseFloat(row.timeTaken.replace(/[^\d.]/g, ''))?.toFixed(2)}</TableCell>
                <TableCell>
                  <span style={{ backgroundColor: getBackgroundColor(row.response.status), padding: '2px 5px', borderRadius: '4px', color: 'white' }}>
                    {row.response.status}
                  </span>
                </TableCell>
                <TableCell>{row.request.uri}</TableCell>
                {/* <TableCell>Add other data cells based on your actual data</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>)
}
    </Container>
  );
};

export default App;
