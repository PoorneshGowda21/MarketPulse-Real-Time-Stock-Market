import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Header from "../components/Header";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Card,
  CardContent,
  Avatar,
  Alert,
  Snackbar,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StarIcon from "@mui/icons-material/Star";
import "./Testimonials.scss";

const initialReviews = [
  {
    id: 1,
    name: "Sneha Giranje",
    role: "Product Manager at Ittiam",
    avatar: "https://res.cloudinary.com/practicaldev/image/fetch/s--0SCWkYwS--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/9dhr4cw2s0skgfig8qnw.png",
    rating: 5,
    comment: "SPM is a great platform for investment. Interactive and clean User Interface. Features like creating your own portfolio are great..I started investing in MF due to SPM only. Very responsive Support team. Always available to help for any query",
  },
  {
    id: 2,
    name: "Nikhil Bindal",
    role: "Designer at TechCorp",
    avatar: "https://res.cloudinary.com/practicaldev/image/fetch/s--nSI8V6RE--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/81co8nilff5r9eer3xga.png",
    rating: 5,
    comment: "SPM.in was the platform where I first got onboard to MF and I would have to say, even for a beginner like me it made things quite easier to explore and invest. SPM actually helped me make better-informed decisions.",
  },
  {
    id: 3,
    name: "Shardul Surve",
    role: "Technical Product Specialist at Google",
    avatar: "https://res.cloudinary.com/practicaldev/image/fetch/s--gRFMHqWs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/1xwiaya5i7wweic3pz96.png",
    rating: 5,
    comment: "If you are one of those who would like to take control of how you save, use SPM. It is ridiculously easy portal. It took me 5 mins to set up and 10 mins to find the funds that suited my need and invest.",
  },
  {
    id: 4,
    name: "Kalpesh Lambe",
    role: "Senior Product Specialist at Adobe",
    avatar: "https://res.cloudinary.com/practicaldev/image/fetch/s--gRFMHqWs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/1xwiaya5i7wweic3pz96.png",
    rating: 5,
    comment: "If you are one of those who would like to take control of how you save, use SPM. It is ridiculously easy portal. It took me 5 mins to set up and 10 mins to find the funds that suited my need and invest.",
  },
];

const Testimonials = () => {
  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = loggedUser?.name || loggedUser?.username || "Investor";

  const [reviewsList, setReviewsList] = useState(() => {
    const saved = localStorage.getItem("spm_user_reviews");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialReviews;
      }
    }
    return initialReviews;
  });

  const [name, setName] = useState(userName);
  const [role, setRole] = useState("Investor / Trader");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    localStorage.setItem("spm_user_reviews", JSON.stringify(reviewsList));
  }, [reviewsList]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newReview = {
      id: Date.now(),
      name: name.trim() || "Anonymous Investor",
      role: role.trim() || "Verified Investor",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=4cceac&color=fff&bold=true`,
      rating: rating || 5,
      comment: comment.trim(),
    };

    setReviewsList([newReview, ...reviewsList]);
    setComment("");
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", margin: "0 auto" }}>
      <Header title="Customer Reviews" subtitle="Read testimonials & share your platform feedback" />

      {/* Testimonials Carousel */}
      <Box sx={{ mb: 5, borderRadius: "16px", overflow: "hidden" }}>
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={5000}
        >
          {reviewsList.map((item) => (
            <div key={item.id} style={{ padding: "20px 0" }}>
              <div className="myCarousel">
                <h3>{item.name}</h3>
                <h4>{item.role}</h4>
                <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
                  <Rating value={item.rating} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                </Box>
                <p>"{item.comment}"</p>
              </div>
            </div>
          ))}
        </Carousel>
      </Box>

      {/* Add Feedback / Review Form Section */}
      <Card
        sx={{
          backgroundColor: "#1F2A40",
          borderRadius: "16px",
          border: "1px solid rgba(76, 206, 172, 0.4)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          mb: 4,
          p: 2,
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <RateReviewIcon sx={{ color: "#4cceac", fontSize: "28px" }} />
            <Typography variant="h5" sx={{ color: "#ffffff", fontWeight: "bold" }}>
              Share Your Feedback & Review
            </Typography>
          </Box>

          <form onSubmit={handleSubmitReview}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#ffffff",
                      backgroundColor: "#141b2d",
                      "& fieldset": { borderColor: "#3e4396" },
                      "&:hover fieldset": { borderColor: "#4cceac" },
                      "&.Mui-focused fieldset": { borderColor: "#4cceac" },
                    },
                    "& .MuiInputLabel-root": { color: "#a3a3a3" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Profession / Role"
                  variant="outlined"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#ffffff",
                      backgroundColor: "#141b2d",
                      "& fieldset": { borderColor: "#3e4396" },
                      "&:hover fieldset": { borderColor: "#4cceac" },
                      "&.Mui-focused fieldset": { borderColor: "#4cceac" },
                    },
                    "& .MuiInputLabel-root": { color: "#a3a3a3" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 1 }}>
                  <Typography sx={{ color: "#e0e0e0", fontWeight: 600 }}>Your Rating:</Typography>
                  <Rating
                    name="user-rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    size="large"
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  required
                  label="Your Review / Feedback"
                  placeholder="Tell us about your trading & portfolio experience..."
                  variant="outlined"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#ffffff",
                      backgroundColor: "#141b2d",
                      "& fieldset": { borderColor: "#3e4396" },
                      "&:hover fieldset": { borderColor: "#4cceac" },
                      "&.Mui-focused fieldset": { borderColor: "#4cceac" },
                    },
                    "& .MuiInputLabel-root": { color: "#a3a3a3" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SendIcon />}
                  sx={{
                    backgroundColor: "#4cceac",
                    color: "#141b2d",
                    fontWeight: "bold",
                    fontSize: "15px",
                    px: 4,
                    py: 1.2,
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#3da58a",
                    },
                  }}
                >
                  Submit Review
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%", backgroundColor: "#4cceac", color: "#141b2d", fontWeight: "bold" }}>
          🎉 Thank you! Your review has been added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Testimonials;