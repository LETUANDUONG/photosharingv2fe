import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import { fetchModel } from "../../lib/fetchModelData";

// Đảm bảo URL này là URL Preview (.csb.app) của Backend đang chạy
const BACKEND_URL = "https://nrklg2-8081.csb.app";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchModel(`${BACKEND_URL}/photosOfUser/${userId}`)
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi tải ảnh:", error);
        setLoading(false);
      });
  }, [userId]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (!photos || photos.length === 0)
    return (
      <Typography sx={{ p: 2 }}>
        Người dùng này chưa tải lên bức ảnh nào.
      </Typography>
    );

  return (
    <Box sx={{ padding: 2 }}>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ marginBottom: 4, boxShadow: 3 }}>
          <CardMedia
            component="img"
            /* THAY ĐỔI QUAN TRỌNG: 
               1. Đảm bảo bạn đã di chuyển thư mục images vào trong thư mục 'public'.
               2. Sử dụng đường dẫn tuyệt đối bắt đầu bằng '/' để CodeSandbox không cần transpile ảnh.
            */
            image={`/images/${photo.file_name}`}
            alt="Ảnh người dùng"
            sx={{
              maxHeight: 600,
              width: "100%",
              objectFit: "contain",
              backgroundColor: "#f0f0f0",
            }}
          />
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              Đăng ngày: {new Date(photo.date_time).toLocaleString()}
            </Typography>

            <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
              Bình luận ({photo.comments ? photo.comments.length : 0}):
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment) => (
                <Box
                  key={comment._id}
                  sx={{
                    mb: 2,
                    p: 1.5,
                    backgroundColor: "#f9f9f9",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">
                    <Link
                      to={`/users/${comment.user._id}`}
                      style={{
                        textDecoration: "none",
                        color: "#1976d2",
                        fontWeight: "bold",
                      }}
                    >
                      {comment.user.first_name
                        ? `${comment.user.first_name} ${comment.user.last_name}`
                        : comment.user.last_name}
                    </Link>
                    <span
                      style={{
                        color: "gray",
                        marginLeft: 8,
                        fontSize: "0.85em",
                      }}
                    >
                      {new Date(comment.date_time).toLocaleString()}
                    </span>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mt: 0.5 }}
                    // Sử dụng dangerouslySetInnerHTML nếu dữ liệu từ database chứa thẻ HTML
                    dangerouslySetInnerHTML={{ __html: comment.comment }}
                  />
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Chưa có bình luận nào.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
