import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "../../../layout/components/Card";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  if (isLoading) {
    return <CircularProgress />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <div>
      <Typography variant="h1" sx={{ paddingTop: "8px" }}>
        New Released Albums
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.albums.items.map((album) => (
            <Grid
              size={{ xs: 6, sm: 4, md: 2 }}
              key={album.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: 200 }}>
                <Card
                  image={album.images[0].url}
                  name={album.name}
                  artistName={album.artists[0].name}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </div>
  );
};

export default NewReleases;
