import { Box, Typography } from "@material-ui/core";

const PrivacyPolicy = () => {
    return (
        <Box style={{
            padding: "50px 20% 50px 20%",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        }}>
            <Typography variant="h3">
                Privacy Policy
            </Typography>
            <Box>
                <Typography variant="h5">Overview</Typography>
                <Typography>
                    We care about your privacy and we've designed our services with this in mind.
                    This policy covers the services that are offered by Cross Court when you interact through our website or application.
                    We want you to understand what personal information we collect and store about you, what we will do with that information, and who we might share that information with.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h5">What information we collect</Typography>
                <Typography>
                    The Cross Court application currently supports log on with Facebook which means we will have access to your first and last name, email address, and profile picture.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h5">Cookies</Typography>
                <Typography>
                    Cookies are pieces of information that are automatically downloaded to your computer or mobile device when you use a website.
                    We use cookies in our application to provide an seamless experience, for example remembering who you are so you don't need to log in again.

                    We can't use cookies to view any data on your device, only data stored in the cookie.  Some parts of the application can't work without these cookies so we've automatically turned them on.  You can switch off cookies and other tracking services in the settings of your browser, but this may result in parts of the application not working.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h5">Where your personal information is held</Typography>
                <Typography>
                    The personal information that we collect about you is securely stored using Amazon services.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h5">Sharing your information with others</Typography>
                <Typography>
                    We will never, for any reason, share your personal information with anyone.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h5">Retention period</Typography>
                <Typography>
                    We can only hold personal information we collect about you for as long as is necessary to provide our services to you.  We will hold onto your information unless you request that we delete it from our system.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h5">Changes to our privacy policy</Typography>
                <Typography>
                    What information we collect and how we use that information may change, meaning that this policy may change over time.
                </Typography>
            </Box>
        </Box>
    );
}

export default PrivacyPolicy;