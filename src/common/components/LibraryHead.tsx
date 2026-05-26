import { styled, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import Library from "./Library";
import { NavLink } from "react-router";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));

const LibraryHead = () => {
  return (
    <>
      <StyledNavLink to="playlist">
        <BookmarkIcon />
        <Typography variant="h2" style={{ fontWeight: 700 }}>
          Your Library
        </Typography>
        <Typography style={{ color: "green" }}>
          <AddIcon style={{ display: "flex" }} />
        </Typography>
      </StyledNavLink>
      <div>
        <Library />
      </div>
    </>
  );
};

export default LibraryHead;
