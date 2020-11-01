import React from 'react';
import { Card, Button } from "tabler-react";

export default function Home() {
    return (
        <div>
            <Card>
                <Card.Header>
                    <Card.Title>Card Title</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Button color="primary">A Button</Button>
                </Card.Body>
            </Card>
        </div>
    )
}