import { Box, IconButton, Menu, MenuItem, styled } from "@mui/material";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    color: "white",
    minWidth: "160px",
  },
});
const ProfileMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#444",
  },
});
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const queryClient = useQueryClient();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    // 로그아웃 로직
    localStorage.removeItem("access_token");
    queryClient.removeQueries({
      queryKey: ["current-user-profile"],
    });
    handleMenuClose();
  };
  const { data: userProfile } = useGetCurrentUserProfile();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "64px",
      }}
    >
      {userProfile ? (
        userProfile.images[0] ? (
          <img
            src={userProfile.images[0]?.url}
            style={{ width: 40, borderRadius: "50%" }}
          />
        ) : (
          <ProfileContainer>
            <IconButton onClick={handleMenuOpen} size="small">
              <img
                src="/images/default profile2.png"
                alt="default profile"
                style={{ width: 40, borderRadius: "50%" }}
              />
            </IconButton>
            <ProfileMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              keepMounted
            >
              <ProfileMenuItem onClick={logout}>Log out</ProfileMenuItem>
            </ProfileMenu>
          </ProfileContainer>
        )
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;
