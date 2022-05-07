import { Box, Typography } from "@material-ui/core";

const Footer: React.FC = () => {
    return (
        <Box 
            boxShadow={3}
            style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#009DDC",
                color: "white"
            }}>
            <Typography variant="body2">
                If you have any questions or suggestions, please feel free to contact us at <a href="mailto:crosscourtapp@gmail.com">crosscourtapp@gmail.com</a>
            </Typography>
        </Box>
    );
}

export default Footer;