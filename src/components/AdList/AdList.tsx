import AdCard from '../AdCard/AdCard';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useAds } from '../../hooks';
import useGetAdsBySubcategory from '../../hooks/usegetAds';
import { useParams } from 'react-router-dom';
import { SetStateAction, useState } from 'react';


const AdList = () => {
  const { subcategoryName } = useParams<{ subcategoryName?: string }>();
  const { data: ads, isLoading, error } = subcategoryName 
    ? useGetAdsBySubcategory(subcategoryName) 
    : useAds();

    const [sortMethod, setSortMethod] = useState('newest');

    const handleSortChange = (event: { target: { value: SetStateAction<string>; }; }) => {
      setSortMethod(event.target.value);
    };
  
    const getSortedAds = () => {
      if (!ads) return [];
    
      return ads.filter((a:any) => a.creationDate).sort((a:any, b:any) => {
        switch (sortMethod) {
          case 'newest':
            if (!b.creationDate) return -1;
            if (!a.creationDate) return 1;
            return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
          case 'oldest':
            if (!a.creationDate) return -1;
            if (!b.creationDate) return 1;
            return new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime();
          default:
            return 0; 
        }
      });
    };
  
    const sortedAds = getSortedAds();

  return (
    <div>
      <FormControl fullWidth sx={{ marginBottom: 5}}>
        <InputLabel id="sort-select-label" sx={{ color: 'black' }} >Sort By</InputLabel>
        <Select
          labelId="sort-select-label"
          value={sortMethod}
          label="Sort By"
          onChange={handleSortChange}
        >
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
        </Select>
      </FormControl>
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Unable to render data!</h4>
          <p>{error.message}</p>
          <hr />
          <p className="mb-0">Something went wrong, please try again.</p>
        </div>
      ) : ads && (
          <Grid container spacing={4} justifyContent="center">
            {sortedAds.map((ad:any) => (
              <Grid item xs={12} sm={6} key={ad.id}>
                <AdCard ad={ad} />
              </Grid>
            ))}
          </Grid>
        )}
    </div>
  );
};

export default AdList;