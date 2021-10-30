import { Backdrop, LinearProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

const Progress = () => {
    const { isMobile } = useSelector((state: RootState) => state.general);

    return (
        <>
            <Backdrop
                style={{ 
                    opacity: "50%",
                    zIndex: 10
                }}
                open={true}
            />
            <LinearProgress 
                style={{
                    position: "absolute",
                    top: isMobile ? "50px" : "64px",
                    width: "100%",
                    zIndex: 20
                }}
                color="primary"
            />
        </>
    );
}

export default Progress;