import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CardBox = ({ CaseDetails, TitleType }) => {

    return (
        <Card sx={{ width: 350, m: 2, boxShadow: 3, textAlign: 'center', padding: 1 }}>
            <CardContent>
                <Typography color="text.secondary" gutterBottom>
                    <strong>{TitleType}</strong>
                </Typography>
                <Typography variant="h4" component="div">
                    {CaseDetails}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CardBox;