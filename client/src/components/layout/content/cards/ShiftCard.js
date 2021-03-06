import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '../../../common/CircularProgress';
import EditShiftModal from '../shifts/EditShiftModal';
import DeleteShiftModal from '../shifts/DeleteShiftModal';
import ClockOutModal from '../shifts/ClockOutModal';
import isEmpty from '../../../../validation/isEmpty';
import Moment from 'react-moment';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginBottom: 15
  },
});

class ShiftCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { workShifts, loading, classes } = this.props;
    const dateFormat = "MM/DD HH:mm";
    let workShiftCard;
    if (loading) {
      workShiftCard = <CircularProgress />;
    } else if (isEmpty(workShifts)) {
      workShiftCard = <span>No shifts to display</span>
    } else {
      workShiftCard = workShifts.map(workshift =>
        <Card className={classes.card} key={workshift._id + "card"} id={workshift._id}>
          <CardContent>
            <List>
              <ListItem>
                <ListItemText
                  primary="Clock In"
                  secondary=
                  { 
                    workshift.clockIn
                    ?
                    <Moment format={dateFormat}>{workshift.clockIn}</Moment>
                    :
                    null
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Clock In Description"
                  secondary=
                  {
                    workshift.clockInDesc
                      ?
                      workshift.clockInDesc
                      :
                      null
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Clock Out"
                  secondary=
                  {
                    workshift.clockOut
                      ?
                      <Moment format={dateFormat}>{workshift.clockOut}</Moment>
                      :
                      null
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Clock Out Description"
                  secondary=
                  {
                    workshift.clockOutDesc
                      ?
                      workshift.clockOutDesc
                      :
                      null
                  }
                />
              </ListItem>
            <ListItem>
              <ListItemText
                primary="Duration"
                secondary=
                {
                  workshift.clockOut
                    ?
                    moment(workshift.clockOut).diff(moment(workshift.clockIn), 'hours', true).toFixed(1) + ' hrs'
                    :
                    workshift.clockOut
                }
              />
            </ListItem>
            </List>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
          <div className={classes.root}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                {
                  workshift.clockOut
                  ?
                  null
                  :
                  <ClockOutModal
                    btnText={"Clock Out"}
                    shiftId={workshift._id}
                    fullWidth={true}
                  />
                }
              </Grid>
              <Grid item xs={6}>
                <EditShiftModal
                  workshift={workshift}
                />
              </Grid>
              <Grid item xs={6}>
                <DeleteShiftModal
                  workshift={workshift}
                />
              </Grid>
            </Grid>
          </div>
          </CardActions>
        </Card>
      )   
    }

    return (
      <Grid>
        {workShiftCard}
      </Grid>
    );
  }
}

ShiftCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShiftCard);