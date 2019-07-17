import React  from 'react'
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import SearchPage from '../Search/SearchPage'



const styles = theme => ({
  content: {
  	 ...theme.mixins.gutters(),
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
     
  }
});

function Home(props) {
  const { classes } = props;
  
  return (
    <div className={classes.content}>
        <SearchPage />
    </div>
  )

}
 
Home.propTypes = { 
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(Home);

