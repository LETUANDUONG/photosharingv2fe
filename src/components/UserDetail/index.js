import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Button, Box, CircularProgress } from "@mui/material";
import { fetchModel } from "../../lib/fetchModelData";

const BACKEND_URL = "https://nrklg2-8081.csb.app";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchModel(`${BACKEND_URL}/user/${userId}`)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải chi tiết người dùng:", err);
        setLoading(false);
      });
  }, [userId]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (!user)
    return <Typography sx={{ p: 2 }}>Không tìm thấy người dùng</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        <Typography variant="h4" gutterBottom>
          {user.first_name
            ? `${user.first_name} ${user.last_name}`
            : user.last_name}
        </Typography>
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Vị trí:</strong> {user.location}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Mô tả:</strong>{" "}
        <span dangerouslySetInnerHTML={{ __html: user.description }} />
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Nghề nghiệp:</strong> {user.occupation}
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to={`/photos/${user._id}`}
        sx={{ mt: 2 }}
      >
        Xem ảnh của {user.first_name || user.last_name}
      </Button>
    </Box>
  );
}

export default UserDetail;
