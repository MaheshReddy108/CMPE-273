import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button
  } from "shards-react";
import TextField from '@material-ui/core/TextField';

class OwnerOrderManagement extends React.Component {
 
    constructor(props) {
        super(props);
         
    }

    render(){
        return(
        <>
            <div align="center">
                Your restaurant Orders
            </div>
            <Card>
                <CardHeader>
                    Manish K
                    <br/>
                    <Button>Cancel the Order</Button>
                </CardHeader>
                <div>
                    Address: San Jose, CA, 95110
                </div>
                <div>
                    <p>Item Details</p>
                    <p>Items: </p>
                    <div>
                       Quantity
                     </div>
                    <TextField style={{width:"100px"}} variant="outlined">
                    </TextField> 
                    <div>
                        Price
                    </div>
                    <TextField style={{width:"100px"}} variant="outlined">
                    </TextField>
                    <div>
                        Status of the order: 
                    </div>
                </div>
            </Card>
            <br/>
            <Card>
                <CardHeader>
                    Manish K
                    <br/>
                    <Button>Cancel the Order</Button>
                </CardHeader>
                <div>
                    Address: San Jose, CA, 95110
                </div>
                <div>
                    <p>Item Details</p>
                    <p>Items: </p>
                    <div>
                       Quantity
                     </div>
                    <TextField style={{width:"100px"}} variant="outlined">
                    </TextField> 
                    <div>
                        Price
                    </div>
                    <TextField style={{width:"100px"}} variant="outlined">
                    </TextField>
                    <div>
                        Status of the order: 
                    </div>
                </div>
            </Card>
        </>
        )
    }
}

export default OwnerOrderManagement;