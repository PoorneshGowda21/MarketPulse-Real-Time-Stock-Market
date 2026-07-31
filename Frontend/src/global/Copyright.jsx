import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props) {
  return (
    <Typography variant="body2" sx={{ color: "#a3a3a3", py: 2, fontWeight: 500 }} align="center" {...props}>
      <Link color="inherit" sx={{ textDecoration: "none", color: "#4cceac", fontWeight: "bold" }} href="#">
        Made by Poornesh Gowda
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}