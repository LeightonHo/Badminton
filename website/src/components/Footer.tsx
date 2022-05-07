import { Box, Typography } from "@material-ui/core";
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {
    return (
        <Box 
            boxShadow={3}
            style={{
                padding: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#03254E",
                color: "white",
                gap: "15px"
        }}>
            <EmailIcon onClick={() => { window.open("mailto:crosscourtapp@gmail.com"); }} style={{
                cursor: "pointer"
            }} />
            <LinkedInIcon onClick={() => { window.open("https://www.linkedin.com/in/leighton-ho-88a724b5/", "_blank"); }} style={{
                cursor: "pointer"
            }} />
            <GitHubIcon onClick={() => { window.open("https://github.com/LeightonHo", "_blank"); }} style={{
                cursor: "pointer"
            }} />
        </Box>
    );
}

export default Footer;