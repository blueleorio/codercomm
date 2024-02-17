import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Card,
  Box,
  Pagination,
  Grid,
  Container,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFriendRequests, getFriendRequestsOutgoing } from "./friendSlice";
import UserCard from "./UserCard";
import SearchInput from "../../components/SearchInput";

function FriendRequests() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = React.useState(1);
  const [requestType, setRequestType] = useState("incoming");

  const { currentPageUsers, usersById, totalUsers, totalPages } = useSelector(
    (state) => state.friend
  );
  const users = currentPageUsers.map((userId) => usersById[userId]);
  const dispatch = useDispatch();

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  useEffect(() => {
    if (requestType === "incoming") {
      dispatch(getFriendRequests({ filterName, page }));
    } else {
      dispatch(getFriendRequestsOutgoing({ filterName, page }));
    }
  }, [filterName, page, requestType, dispatch]);

  const toggleRequestType = () => {
    // New function to toggle the request type
    setRequestType(requestType === "incoming" ? "outgoing" : "incoming");
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friend Requests
      </Typography>
      <Button onClick={toggleRequestType} variant="contained" color="primary">
        {requestType === "incoming" ? "Outgoing" : "Incoming"} Requests
      </Button>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} requests found`
                : totalUsers === 1
                ? `${totalUsers} request found`
                : "No request found"}
            </Typography>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </Stack>

        <Grid container spacing={3} my={1}>
          {users.map((user) => (
            <Grid key={user._id} item xs={12} md={4}>
              <UserCard profile={user} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}

export default FriendRequests;
