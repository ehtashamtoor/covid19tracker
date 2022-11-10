import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CardBox = ({ CaseDetails, TitleType, style }) => {

    return (
        <Card sx={{ width: 350, m: 2, boxShadow: 3, textAlign: 'center', padding: 1, borderRadius:40 }} className={'' + style} id='card'>
            <CardContent>
                <Typography color="text.secondary" id='titleType'>
                    <strong>{TitleType}</strong>
                </Typography>
                <Typography variant="h4" component="div" id='numbers'>
                    {CaseDetails}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CardBox;