import { CircularProgress, styled } from "@mui/material";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const MarginSpan = styled("span")({
  marginRight: "5px",
  marginLeft: "5px",
});
const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 140px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));
const Library = () => {
  const { ref, inView } = useInView();
  const {
    data: userPlaylist,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });
  const { data: user } = useGetCurrentUserProfile();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);
  if (!user) return <EmptyPlaylist />;

  return (
    <PlaylistContainer>
      {userPlaylist ? (
        userPlaylist?.pages.map((page) =>
          page.items.map((item) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 6,
              }}
              key={item.id}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <img
                  style={{ width: 50 }}
                  src={
                    item.images
                      ? item?.images[0].url
                      : "/images/default profile2.png"
                  }
                  alt=""
                />
              </div>
              <div>
                <div>{item.name}</div>
                <div>
                  <span>{item.type}</span>
                  <MarginSpan>·</MarginSpan>
                  <span>{item.owner.display_name}</span>
                </div>
              </div>
            </div>
          )),
        )
      ) : (
        <EmptyPlaylist />
      )}
      <div ref={ref}></div>
    </PlaylistContainer>
  );
};

export default Library;
