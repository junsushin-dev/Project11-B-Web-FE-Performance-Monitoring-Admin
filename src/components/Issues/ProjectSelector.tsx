import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import service from '../../service';
import { IProjectCardProps } from '../../types';

const useStyles = makeStyles(() =>
  createStyles({
    root: { width: '100%', margin: '16px 0px' },
    formControl: {
      minWidth: 120,
      maxWidth: '33%',
    },
    select: { height: '80px' },
    chips: { height: '100%', display: 'flex', flexWrap: 'wrap' },
    chip: {
      height: '40px',
      margin: 2,
    },
  }),
);

export interface IProjectSelectorProps {
  selectedProject: IProjectCardProps[];
  setSelectedProject: React.Dispatch<React.SetStateAction<IProjectCardProps[]>>;
}
function ProjectSelector(props: IProjectSelectorProps): React.ReactElement {
  const classes = useStyles();
  const { selectedProject, setSelectedProject } = props;
  const [projects, setProjects] = useState<IProjectCardProps[]>([]);
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedProject(event.target.value as IProjectCardProps[]);
  };
  useEffect(() => {
    (async () => {
      const projectRespone = await service.getProjects();
      setProjects(projectRespone.data.projects);
    })();
  }, []);
  return (
    <Box className={classes.root}>
      <FormControl variant="outlined" size="medium" fullWidth className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">SELECTED PROJECT</InputLabel>
        <Select
          className={classes.select}
          placeholder="SELECTED PROJECT"
          variant="filled"
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={selectedProject}
          onChange={handleSelectChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as IProjectCardProps[]).map((value) => (
                <Chip color="primary" key={value._id} label={value.name} className={classes.chip} />
              ))}
            </div>
          )}
        >
          {projects.map((project) => (
            <MenuItem className={classes.select} key={project._id} value={project as any}>
              {project.name} : {`[${project._id}]`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ProjectSelector;
