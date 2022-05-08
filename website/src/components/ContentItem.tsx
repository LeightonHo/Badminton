import { Box, Typography } from "@material-ui/core";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

interface Props {
    title: string,
    imageDescription: string,
    imageFilename: string,
    body: string[]
}

const ContentItem: React.FC<Props> = ({ title, imageDescription, imageFilename, body }) => {
    return (
        <Box style={{
            padding: "0 20px 30px 20px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "left",
            scrollSnapAlign: "start"
        }}>
            <Box style={{
                maxWidth: "300px",
            }}>
                <img 
                    src={require(`../static/${imageFilename}`)}
                    alt={imageDescription}
                    style={{
                        height: "100%",
                        width: "100%",
                }} />
            </Box>
            <Box>
                <Typography variant="h4" gutterBottom>{title}</Typography>
                {body.map((item, index) => (
                    <Box key={index} style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                        gap: "10px"
                    }}>
                        <StarRateRoundedIcon style={{
                            color: "#FFA62B",
                            fontSize: 26
                        }} />
                        <Typography variant="body1">
                            {item}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ContentItem;