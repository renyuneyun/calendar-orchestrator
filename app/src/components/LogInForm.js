import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function SignUpForm({ trigger }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");

    trigger(email, password);
  };

  return (
    <>
      <Typography variant="subtitle1">
        Haven't used the calendar orchestrator before? Enter your Solid
        credentials to allow the orchestrator to read/write to your Pod, so it
        can fetch external calendar and store it into your Pod.
        You can skip this step if you have done so previously.
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Username/Email"
              fullWidth
              autoComplete="email"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              autoComplete="current-password"
              variant="standard"
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Generate token
            </Button>
            {/* <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
