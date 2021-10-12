import { Backdrop, LinearProgress } from "@material-ui/core";

const Progress = () => {
    return (
        <>
            <Backdrop
                style={{ color: '#fff', zIndex: 99 }}
                open={true}
            />
            <LinearProgress 
                color="primary"
            />
        </>
    );
}

export default Progress;