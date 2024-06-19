import React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';

const categories = [
  {
    id: 'Zarządzaj',
    children: [
      {
        id: 'Użytkownicy',
        icon: <AccountCircleIcon />,
        view: 'users',
      },
      { id: 'Zamówienia', icon: <ShoppingCartIcon />, view: 'orders' },
      { id: 'Produkty', icon: <CategoryIcon />, view: 'products' },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

const fixedItem = {
  fontSize: 22,
  color: '#fff',
  bgcolor: '#003366',
  py: '2px',
  px: 3,
};

export default function Navigator(props) {
  const { onSelectView, ...other } = props;

  return (
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem sx={{ ...fixedItem, ...itemCategory }}>
            Electronics
          </ListItem>
          {categories.map(({ id, children }) => (
              <Box key={id} sx={{ bgcolor: '#002244' }}>
                <ListItem sx={{ py: 2, px: 3 }}>
                  <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                </ListItem>
                {children.map(({ id: childId, icon, view }) => (
                    <ListItem disablePadding key={childId}>
                      <ListItemButton sx={item} onClick={() => onSelectView(view)}>
                        <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{icon}</ListItemIcon>
                        <ListItemText>{childId}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                ))}
                <Divider sx={{ mt: 2 }} />
              </Box>
          ))}
        </List>
      </Drawer>
  );
}
