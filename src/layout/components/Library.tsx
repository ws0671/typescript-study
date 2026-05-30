import { Box, styled } from "@mui/material";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const MarginSpan = styled("span")({
  marginRight: "5px",
  marginLeft: "5px",
});

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
    console.log("inView:", inView);
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);
  if (!user) return <EmptyPlaylist />;

  return (
    <Box>
      {userPlaylist ? (
        userPlaylist?.pages.map((page) =>
          page.items.map((item, index) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: index === 0 ? 20 : 6,
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
      <div ref={ref}>endddddddddddddddddddddd</div>
    </Box>
  );
};

export default Library;
