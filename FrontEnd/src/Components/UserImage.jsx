import { Box } from "@mui/material";

const UserImage = ({ img, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        src={`http://localhost3001/assets/${img}`}
        style={{ objectFit: "cover", borderRadius: "50%" }}
        alt="UserImage"
        width={size}
        height={size}
      />
    </Box>
  );
};

export default UserImage;
