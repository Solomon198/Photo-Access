import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { Hidden } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import WorkIcon from "@material-ui/icons/Work";
import ShareIcon from "@material-ui/icons/Share";
import { Delete } from "@material-ui/icons";
import Checked from "@material-ui/icons/Check";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "100%",
      margin: "auto",
      overflow: "hidden",
      width: "100%",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: "#232f3e",
    },
  })
);

type Props = {
  index: number;
  activeIndex: number;
  data: any;
  setActiveIndex: (index: number) => void;
  onClick: (jobId: string) => void;
  isDeleting: boolean;
};

export default function RecipeReviewCard(props: Props) {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} my-1 mx-auto`}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <WorkIcon />
          </Avatar>
        }
        title={props.data.title}
        subheader={moment(props.data.createdAt).fromNow()}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.data.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.data.address}
        </Typography>
      </CardContent>

      <CardContent>
        <Typography paragraph>{props.data.more}</Typography>
      </CardContent>
    </Card>
  );
}
