import React, { useState } from 'react';
import { Subcategory, Category } from '../../utils/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import DeleteButton from '../DeleteBtn';
import { useDeleteSubcategory } from '../../hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface CategoryCardProps {
  categories? : Category;
  id?: string;
  name: string;
  subcategories: Subcategory[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({name, id,  subcategories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate: deleteSubcategory } = useDeleteSubcategory();
  const userType = useSelector((state: RootState) => state.auth.userType);



  const handleSubCategoryClick = (subcategory: Subcategory) => {
    navigate(`/subcategory/${subcategory.name}`);
  };

  const handleDeleteSubcategory = (subcategoryId: string) => {
    if (id == null) {
      console.error('Cannot delete subcategory because categoryId is null');
      // Additional error handling logic can go here
      return;
    }
  
    deleteSubcategory({ categoryId: id, subcategoryId });
    window.location.reload();
  };

  return (
    <Card
      sx={{
        marginBottom: '1rem',
        boxShadow: 2,
        transition: '0.3s', 
        '&:hover': {
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        },
        overflow: 'visible',
        borderRadius: '10px',
      }}
    >
      <CardContent
        sx={{
          padding: '16px',
          '&:last-child': { paddingBottom: '16px' },
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.25rem',
            marginBottom: '0.5rem',
          }}
          variant="h5"
        >
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            size="small"
            sx={{ marginRight: '0.5rem', color: isOpen ? 'black' : 'inherit' }}
          >
            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          {name}
        </Typography>
        {isOpen && (
          <List
            sx={{
              paddingLeft: '1.5rem',
              listStyle: 'none',
              transition: 'max-height 0.3s ease-in-out',
              maxHeight: isOpen ? '500px' : '0',
              overflow: 'hidden',
            }}
          >
            {subcategories.map((subcategory) => (
              <ListItem
                key={subcategory.id}
                disablePadding
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '&:hover': { backgroundColor: 'action.hover' },
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                }}
              >
                <ListItemButton onClick={() => handleSubCategoryClick(subcategory)}>
                  <Typography sx={{ fontSize: '1rem', color: 'black' }}>
                    {subcategory.name}
                  </Typography>
                </ListItemButton>
                {userType === 'ADMIN' && (
              <DeleteButton onDelete={() => handleDeleteSubcategory(subcategory.id)} />
            )}              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
