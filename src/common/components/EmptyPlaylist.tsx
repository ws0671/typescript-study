import { styled, Typography } from "@mui/material";
const FlexBox = styled("div")(({ theme }) => ({
  padding: "20px",
  backgroundColor: theme.palette.background.paper,
}));

const Btn = styled("button")({
  marginTop: "20px",
  padding: "12px",
  borderRadius: "20px",
  color: "black",
});
const EmptyPlaylist = () => {
  return (
    <FlexBox>
      <div>
        <Typography variant="h2" style={{ fontWeight: 700 }}>
          <div>Create your first playlist</div>
        </Typography>
        <div>It's easy, we'll help you</div>
      </div>

      <Btn>
        <Typography variant="h2" style={{ fontWeight: 700 }}>
          Create playlist
        </Typography>
      </Btn>
    </FlexBox>
  );
};

export default EmptyPlaylist;
