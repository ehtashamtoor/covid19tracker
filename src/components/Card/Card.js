import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CardBox = ({ CaseDetails, TitleType }) => {

    return (
        <Card sx={{ width: 350, m: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography color="text.secondary" gutterBottom>
                    {TitleType}
                </Typography>
                <Typography variant="h4" component="div">
                    {CaseDetails}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">See more</Button>
            </CardActions>
        </Card>
    );
}

export default CardBox;