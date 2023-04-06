import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : "#262632",
    ...theme.typography.body2,
    boxShadow: "none",
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: 0,
    margin: "auto"
  }));

  export default Item;