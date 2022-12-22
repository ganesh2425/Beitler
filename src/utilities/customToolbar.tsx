import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
    iconButton: {
    },
};

const CustomToolbar = ({classes}: any): JSX.Element => {
    const handleClick = () => {
        console.log("clicked on icon!");
    }
    return (
        <React.Fragment>
            <Tooltip title={"custom icon"}>
                <IconButton className={classes.iconButton} onClick={handleClick}>
                    <AddIcon className={classes.deleteIcon} />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);

