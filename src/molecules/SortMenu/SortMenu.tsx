import { useState } from "react";
import {
  Box,
  Fab,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";

interface SortMenuProps {
  selectedSort: string;
  onSelectSortChange: (value: string) => void;
}

const SortMenu = ({ selectedSort, onSelectSortChange }: SortMenuProps) => {
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);

  const isSortMenuOpen = Boolean(sortAnchorEl);

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSelect = (selectedSort: string) => {
    setSortAnchorEl(null);
    onSelectSortChange(selectedSort);
  };
  return (
    <Box>
      <Fab variant="extended" color="secondary" onClick={handleSortClick}>
        <SortIcon sx={{ mr: 1 }} />
        Sort
      </Fab>
      <Menu
        id="basic-menu"
        anchorEl={sortAnchorEl}
        open={isSortMenuOpen}
        onClose={() => handleSelect(selectedSort)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => handleSelect("Modified-descending")}
          dense={selectedSort !== "Modified-descending"}
        >
          {selectedSort === "Modified-descending" && (
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
          )}
          <ListItemText inset={selectedSort !== "Modified-descending"}>
            Modified
          </ListItemText>
          <ListItemIcon>
            <ArrowDownwardIcon />
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect("Modified-ascending")}
          dense={selectedSort !== "Modified-ascending"}
        >
          {selectedSort === "Modified-ascending" && (
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
          )}
          <ListItemText inset={selectedSort !== "Modified-ascending"}>
            Modified
          </ListItemText>
          <ListItemIcon>
            <ArrowUpwardIcon />
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect("Created-descending")}
          dense={selectedSort !== "Created-descending"}
        >
          {selectedSort === "Created-descending" && (
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
          )}
          <ListItemText inset={selectedSort !== "Created-descending"}>
            Created
          </ListItemText>
          <ListItemIcon>
            <ArrowDownwardIcon />
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect("Created-ascending")}
          dense={selectedSort !== "Created-ascending"}
        >
          {selectedSort === "Created-ascending" && (
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
          )}
          <ListItemText inset={selectedSort !== "Created-ascending"}>
            Created
          </ListItemText>
          <ListItemIcon>
            <ArrowUpwardIcon />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SortMenu;
