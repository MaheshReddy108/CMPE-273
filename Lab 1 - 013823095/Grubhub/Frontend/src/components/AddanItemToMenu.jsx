import React from 'react';
import ImageUploader from 'react-images-upload';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import { Dropdown } from "react-bootstrap";
 
class AddanItemToMenu extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
    
    

    render() {
        return (
            <div>
              <div> Add New Items to the menu</div>
              <div align="center">
                  Photo
              </div>
              <ImageUploader
                withIcon={true}
                buttonText='Upload the item image'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
              />
              <div>Name</div>
              <TextField style={{width:"500px"}} variant="outlined">
              </TextField>
              <br/>
              <br/>
              <div>Description</div>
              <TextField style={{width:"600px"}} variant="outlined">
              </TextField>
              <br/>
              <br/>
              <div>Menu Section</div>
              <Dropdown >
                 <Dropdown.Toggle variant="outlined" id="dropdown-basic">
                    3 Eggs Omlettes
                 </Dropdown.Toggle>

                 <Dropdown.Menu>
                    <Dropdown.Item href="">Pizza</Dropdown.Item>
                    <Dropdown.Item href="">Burger</Dropdown.Item>
                    <Dropdown.Item href="">Burritos</Dropdown.Item>
                    <Dropdown.Item href="">Pasta</Dropdown.Item>
                    <Dropdown.Item href="">Sandwich</Dropdown.Item>
                    <Dropdown.Item href="">Ice cream</Dropdown.Item>
                
                 </Dropdown.Menu>
              </Dropdown>
              <br/>
              <div>
                  Base Price
              </div>
              <TextField style={{width:"100px"}} variant="outlined">
              </TextField>
              <br/>
              <br/>
              <div>
                 <Button variant="outlined" color="primary" >
                   Save & Done
                 </Button>
              </div>
            </div>
        );
    }
}

export default AddanItemToMenu;