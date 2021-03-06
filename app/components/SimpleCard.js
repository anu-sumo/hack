import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import converter from 'hex2dec';


const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


function convert(val, type) {
  if(type === 'hex') {
    return {
      hex: val,
      decimal:  converter.hexToDec(val)
    }
  } else  {
    let hex = converter.decToHex(val,  { prefix: false }) || 0;
    hex =  "00000000000000000000"+ hex;
    hex = hex.slice(hex.length - 16).toUpperCase();
    return {
      hex, 
      decimal: val
    }
  } 
}

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="headline" component="h2">
          Hex/Dec converter
        </Typography>

        <TextField
          id="hex"
          label="Hex"
          fullWidth
          margin="dense"
          value={props.hex}
          onChange={(e) => props.onChange(convert(e.target.value, "hex"))}
        />
        <TextField
          id="decimal"
          label="Decimal"
          fullWidth
          margin="dense"
          value={props.decimal}
          onChange={(e) => props.onChange(convert(e.target.value, "decimal"))}
        />
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
