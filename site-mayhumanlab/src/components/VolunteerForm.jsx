import { useDispatch } from "react-redux";
import { stopVolunteerEdit } from "../features/volunteer/volunteerSlice";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Form } from "react-final-form";


function VolunteerForm() {
    const dispatch = useDispatch();

    function handleExit() {
        dispatch(stopVolunteerEdit());
    }

    return (
        <>
            <Dialog open={true} onClose={handleExit}>
                <IconButton
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon color="primary" sx={{ fontSize: 32 }} onClick={handleExit} />
                </IconButton>
                <DialogContent>
                    <Form></Form>
                </DialogContent>

            </Dialog>

        </>
    )
}

export default VolunteerForm;