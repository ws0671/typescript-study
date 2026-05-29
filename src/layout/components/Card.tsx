import { Box, Typography } from "@mui/material";
import PlayButton from "../../common/components/PlayButton";

interface CardProps {
  name: string;
  image: string;
  artistName: string | undefined;
}
const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <Box
      sx={{
        "&:hover .play-button": {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <img
          src={image}
          style={{
            width: "100%",
            borderRadius: "20px",
          }}
        />
        <Box
          className="play-button"
          sx={{
            position: "absolute",
            right: 10,
            bottom: 10,
            opacity: 0,
            transition: "0.3s",
          }}
        >
          <PlayButton />
        </Box>
      </Box>
      <Typography>{name}</Typography>
      <Typography>{artistName}</Typography>
    </Box>
  );
};

export default Card;
