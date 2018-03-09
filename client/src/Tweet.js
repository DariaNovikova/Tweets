import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export default function Tweet(props) {
    const { userId, userName, hashtags, userImg, tweetText } = props.data
    return <Card key={userId}>
        <CardHeader
            title={userName}
            subtitle={hashtags}
            avatar={userImg}
        />
        <CardText>
            {tweetText}
        </CardText>
    </Card>
}