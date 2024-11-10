"use client"

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SnapPOS from "@/components/nav/SnapPOS"

import TopNav from "@/components/nav/TopNav"
const drawerWidth = 380;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",

});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",

  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(15)} + 10px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 100,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
import { useRouter } from 'next/navigation'
export default function Sidenav({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [isCollapse, setIsCollapse] = React.useState(false);

  const [isCollapseProduct, setIsCollapseProduct] = React.useState(false);

  const [isCollapseEcommerce, setIsCollapseEcommerce] = React.useState(false);

  const [isCollapseReservation, setIsCollapseReservation] = React.useState(false);

  const [isCollapseBlog, setIsCollapseBlog] = React.useState(false);

  const [isCollapseSections, setIsCollapseSections] = React.useState(false);

  const [isCollapsePages, setIsCollapsePages] = React.useState(false);

  const [isCollapseSupport, setIsCollapseSupport] = React.useState(false);

  const [isCollapseStock, setIsCollapseStock] = React.useState(false);

  const router = useRouter()


  const handleNavigation = (path) => {
    router.push(`/dashboard/admin/${path}`);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  const handleCollapseReservation = () => {
    setIsCollapseReservation(!isCollapseReservation);
  };

  const handleCollapseBlog = () => {
    setIsCollapseBlog(!isCollapseBlog);
  };


  const handleCollapseSections = () => {
    setIsCollapseSections(!isCollapseSections);
  };

  const handleCollapsePages = () => {
    setIsCollapsePages(!isCollapsePages);
  };




  const handleCollapseProduct = () => {
    setIsCollapseProduct(!isCollapseProduct);
  };

  const handleCollapseEcommerce = () => {
    setIsCollapseEcommerce(!isCollapseEcommerce);
  };

  const handleCollapseSupport = () => {
    setIsCollapseSupport(!isCollapseSupport);
  };

  const handleCollapseStock = () => {
    setIsCollapseStock(!isCollapseStock);
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}
        sx={{
          backgroundColor: '#1a1a1a',
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <TopNav />
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}

        PaperProps={{ className: 'hidden-scrollbar' }}

      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <>

                <ChevronRightIcon
                  sx={{ color: 'white' }}

                />

              </>


            ) : (

              <>
                <Typography variant="body3" sx={{

                  color: 'red',
                  fontFamily: "'Pacifico', cursive", // You can use any custom font
                  fontSize: '1.5rem', // Adjust size as needed
                  textAlign: 'center',
                  marginRight: '70px',

                }}>
                  <SnapPOS />
                </Typography>




                <ChevronLeftIcon
                  sx={{ color: 'white' }}
                />

              </>
            )}
          </IconButton>
        </DrawerHeader>


        <Divider
          sx={{
            color: 'white',
            border: "2px solid white"


          }}

        />

        {/* dashboard */}
        <List>
          {["dashboard"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => router.push(`/dashboard/admin`)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <InboxIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

          ))}



        </List>
        <Divider
          sx={{
            color: 'white',
            border: "2px solid white"


          }}

        />


        {/* category */}

        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleCollapse}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Manage Category" sx={{ opacity: open ? 1 : 0 }} />
              {isCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            {["all-category"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton

                  onClick={() => handleNavigation(text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    marginLeft: "40px",

                    color: 'white',
                    borderBottom: "2px solid white"

                  }}
                >
                  {/* <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon> */}
                  <ListItemText
                    primary={text.replace(/-/g, " ")}


                    sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </Collapse>
        </List>
        <Divider
          sx={{
            color: 'white',
            border: "2px solid white"


          }}

        />
        {/* manage product */}

        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleCollapseProduct}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Manage Products" sx={{ opacity: open ? 1 : 0 }} />
              {isCollapseProduct ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isCollapseProduct} timeout="auto" unmountOnExit>
            {["all-products",].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton

                  onClick={() => handleNavigation(text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    marginLeft: "40px",

                    color: 'white',
                    borderBottom: "2px solid white"

                  }}
                >
                  {/* <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon> */}
                  <ListItemText
                    primary={text.replace(/-/g, " ")}


                    sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </Collapse>
        </List>








        <Divider

          sx={{
            color: 'white',
            border: "2px solid white"


          }}
        />
        {/* manage purchases */}

        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleCollapseEcommerce}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Manage Purchase" sx={{ opacity: open ? 1 : 0 }} />
              {isCollapseEcommerce ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isCollapseEcommerce} timeout="auto" unmountOnExit>
            {["all-purchase",

            


            ].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton

                  onClick={() => handleNavigation(text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    marginLeft: "40px",

                    color: 'white',
                    borderBottom: "2px solid white"

                  }}
                >
                  {/* <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon> */}
                  <ListItemText
                    primary={text.replace(/-/g, " ")}


                    sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </Collapse>
        </List>






        <Divider
          sx={{
            color: 'white',
            border: "2px solid white"


          }}

        />
        {/* manage invoice */}

        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleCollapseReservation}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Manage Invoice" sx={{ opacity: open ? 1 : 0 }} />
              {isCollapseReservation ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isCollapseReservation} timeout="auto" unmountOnExit>
            {["all-invoice"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton

                  onClick={() => handleNavigation(text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    marginLeft: "40px",

                    color: 'white',
                    borderBottom: "2px solid white"

                  }}
                >
                  {/* <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon> */}
                  <ListItemText
                    primary={text.replace(/-/g, " ")}


                    sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </Collapse>
        </List>




        <Divider
          sx={{
            color: 'white',
            border: "2px solid white"


          }}

        />
        {/* suppliers*/}

        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleCollapseBlog}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Manage Suppliers" sx={{ opacity: open ? 1 : 0 }} />
              {isCollapseBlog ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isCollapseBlog} timeout="auto" unmountOnExit>
            {["all-supplier"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton

                  onClick={() => handleNavigation(text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    marginLeft: "40px",

                    color: 'white',
                    borderBottom: "2px solid white"

                  }}
                >
                  {/* <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon> */}
                  <ListItemText
                    primary={text.replace(/-/g, " ")}


                    sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </Collapse>
        </List>




        <Divider
          sx={{
            color: 'white',
            border: "2px solid white"


          }}

        />
        {/* manage units*/}

        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleCollapseSections}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Manage Units" sx={{ opacity: open ? 1 : 0 }} />
              {isCollapseSections ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isCollapseSections} timeout="auto" unmountOnExit>
            {["all-unit"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton

                  onClick={() => handleNavigation(text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    marginLeft: "40px",

                    color: 'white',
                    borderBottom: "2px solid white"

                  }}
                >
                  {/* <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon> */}
                  <ListItemText
                    primary={text.replace(/-/g, " ")}


                    sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </Collapse>
        </List>



    
    
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, pl: 5, pt: 5 }}>
        <DrawerHeader />

        {children}

      </Box>
    </Box>
  );
}
