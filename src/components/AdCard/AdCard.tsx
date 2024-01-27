import { Ad } from "../../utils/types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteButton from '../DeleteBtn';
import useDeleteAd from '../../hooks/useDeleteAd';
import { RootState } from "../../store";
import { useSelector } from "react-redux";

type Props = {
  ad: Ad;

};

const AdCard = ({ ad }: Props) => {

  const { mutate: deleteAd } = useDeleteAd();
  const userType = useSelector((state: RootState) => state.auth.userType);



  const onDelete = () => {
    if (!ad.id) {
      console.error('Cannot delete ad with null or undefined ID');
      return;
    }
    deleteAd(ad.id, {
      onSuccess: () => {
        console.log(`Ad with ID ${ad.id} was deleted.`);
        window.location.reload();
        
      },
      onError: (error : any) => { 
        console.error('Error deleting the ad:', error);
      },
    });
  };



  return (
    <Card sx={{ marginBottom: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={ad.imgUrl}
        alt={ad.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {ad.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ad.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ad.contact}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ad.subcategory}
        </Typography>
        {userType === 'ADMIN' && (
        <DeleteButton onDelete={onDelete} /> 
        )}
      </CardContent>
    </Card>
  );
};

export default AdCard;