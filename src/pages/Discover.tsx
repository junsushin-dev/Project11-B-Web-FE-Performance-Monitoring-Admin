import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid } from '@material-ui/core';

import DiscoverHeader from '../components/Discover/DiscoverHeader';
import NoProjectSelected from '../components/common/NoProjectSelected';
import TimeCharts from '../components/Discover/TimeCharts';
import IssueCountChart from '../components/Discover/IssueCountChart';
import ShareCharts from '../components/Discover/ShareCharts';

import ChartFrame from '../components/Discover/ChartFrame';

import { RootState } from '../modules';

function Discover(): React.ReactElement {
  const [period, setPeriod] = useState('1w');
  const selectedProjects = useSelector((state: RootState) => state.projects.selectedProjectsIds);
  const [filterQuery, setFilterQuery] = useState({});

  return (
    <Box p={3}>
      <Box pb={3}>
        <DiscoverHeader
          period={period}
          setPeriod={setPeriod}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        />
      </Box>
      {selectedProjects.length === 0 ? (
        <NoProjectSelected />
      ) : (
        <Grid container direction="row" spacing={3} alignItems="stretch">
          <Grid item xs={12}>
            <ChartFrame>
              <TimeCharts filterQuery={filterQuery} period={period} />
            </ChartFrame>
          </Grid>
          <Grid item xs={6}>
            <ChartFrame>
              <IssueCountChart filterQuery={filterQuery} />
            </ChartFrame>
          </Grid>
          <Grid item xs={6}>
            <ChartFrame>
              <ShareCharts filterQuery={filterQuery} period={period} />
            </ChartFrame>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Discover;
