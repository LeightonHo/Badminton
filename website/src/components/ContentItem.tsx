import { Box, Typography } from "@material-ui/core";

interface Props {
    imageOnLeft: boolean,
    imageFilename: string,
    body: string[]
}

const ContentItem: React.FC<Props> = ({ imageOnLeft, imageFilename, body }) => {
    return (
        <Box style={{
            display: "flex",
            flexDirection: (imageOnLeft) ? "row" : "row-reverse",
            flexWrap: "wrap",
        }}>
            <Box style={{
                maxWidth: "300px",
                margin: "auto"
            }}>
                <img src={require(`../static/${imageFilename}`)} style={{
                    height: "100%",
                    width: "100%"
                }} />
            </Box>
            <Box style={{
                maxWidth: "600px",
                margin: "auto"
            }}>
                {body.map((item, index) => (
                    <Typography key={index} variant="body1" gutterBottom>
                        {item}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
};

export default ContentItem;