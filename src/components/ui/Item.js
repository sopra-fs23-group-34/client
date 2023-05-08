import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : "#3b3b37",
    ...theme.typography.body2,
    boxShadow: '5px 2.5px 2.5px black',
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: 0,
    margin: "auto"
  }));

  export default Item;