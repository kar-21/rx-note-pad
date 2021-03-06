import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { RootState } from "../../store/Reducers";

const NavigationHeader = () => {
  const navigate = useNavigate();

  const { jwtToken, given_name } = useSelector(
    (state: RootState) => state.userDetailsReducer
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Note Pad
        </Typography>
        {jwtToken ? (
          <span className="name-container">
            <AccountCircleIcon />
            {given_name}
          </span>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationHeader;
