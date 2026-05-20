import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  CircularProgress,
  Box,
} from "@mui/material";
import { fetchModel } from "../../lib/fetchModelData";

const BACKEND_URL = "https://nrklg2-8081.csb.app";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModel(`${BACKEND_URL}/user/list`)
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải danh sách người dùng:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <div>
      <Typography variant="h6" sx={{ padding: "16px", fontWeight: "bold" }}>
        Danh sách người dùng
      </Typography>
      <Divider />
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem button component={Link} to={`/users/${user._id}`}>
              <ListItemText
                primary={
                  user.first_name
                    ? `${user.first_name} ${user.last_name}`
                    : user.last_name
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
