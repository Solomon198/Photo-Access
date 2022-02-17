import React, { useState } from "react";
import clsx from "clsx";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Drawer, { DrawerProps } from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WorkIcon from "@material-ui/icons/Work";
import PeopleIcon from "@material-ui/icons/People";
import LogoutIcon from "@material-ui/icons/Power";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import { Omit } from "@material-ui/types";
import { useLocation } from "react-router-dom";
import Config from "../../configs/env.config";
import brand from "../../configs/colors.presets";

const styles = (theme: Theme) =>
  createStyles({
    categoryHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
      color: theme.palette.common.white,
    },
    item: {
      paddingTop: 5,
      paddingBottom: 5,
      color: brand.color,
      marginTop: 10,
      backgroundColor: brand.background,
    },
    itemCategory: {
      backgroundColor: brand.background,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    firebase: {
      fontSize: 24,
      color: brand.color,
      textAlign: "center",
    },
    itemActiveItem: {
      color: "#4fc3f7",
    },
    itemPrimary: {
      fontSize: "inherit",
    },
    itemIcon: {
      minWidth: "auto",
      marginRight: theme.spacing(2),
    },
    divider: {
      marginTop: theme.spacing(2),
    },
  });

type Props = {
  navigate: (route: string) => void;
};

export interface NavigatorProps
  extends Props,
    Omit<DrawerProps, "classes">,
    WithStyles<typeof styles> {}

function Navigator(props: NavigatorProps) {
  const { classes, ...other } = props;
  const [categories, setCategories] = useState([
    {
      id: "My Account",
      children: [
        { id: "Jobs", icon: <WorkIcon />, route: "/dashboard" },
        {
          id: "My Credentials",
          icon: <PeopleIcon />,
          route: "/dashboard/credentials",
        },
        { id: "My CV", icon: <DnsRoundedIcon />, route: "/dashboard/cv" },
        {
          id: "Subscription",
          icon: <SettingsInputComponentIcon />,
          route: "/dashboard/subscription",
        },
        { id: "LogOut", icon: <LogoutIcon />, route: "/logout" },
      ],
    },
  ]);
  const location = useLocation();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          <h4 style={{ fontSize: 17, fontWeight: "bold" }}>
            {Config().APP_NAME}
          </h4>
        </ListItem>

        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            {children.map(({ id: childId, icon, route }) => (
              <ListItem
                key={childId}
                onClick={() => props.navigate(route)}
                button
                className={clsx(
                  classes.item,
                  route === location.pathname && classes.itemActiveItem
                )}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default withStyles(styles)(Navigator);
