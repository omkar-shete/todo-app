//Material
import { Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, TextField, Typography, Box } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

//
import React, { useState } from 'react'
// import EditTodoModal from './EditTodoModal';
//DB
import db from './firebase';



//MUI
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  //MUI END


// ---------------EXPORT FUNC COMPO------------------------------------
export default function Todo(props) {

  const [newTodoInput, setNewTodoInput] = useState(props.todoText);

  // let isModalOpen = false;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleOpen = () => {setIsModalOpen(true);}
  const handleClose = () => setIsModalOpen(false);
  
  function updateTodo(e) {
    e.preventDefault(); //prvnts refresh & thus err
    db.collection('todo-items').doc(props.todoId).set( {singleTodoInput:newTodoInput} , {merge:true} );
    handleClose();
  }  
  //can also use .update()



  // function openTodoModal() {
  //   // setIsModalOpen(true);
  //   return (
  //     <div>
  //       <EditTodoModal isModalOpen={isModalOpen} todoText={props.todoText} todoId={props.todoId}/>        
  //   </div> 
  //   )
  // }
     
  function deleteTodo() {
    db.collection('todo-items').doc(props.todoId).delete();
  }
 
  
  // let isDone = false;

  function toggleIsDone() {
    db.collection('todo-items').doc(props.todoId).update( { isDone : !props.isDone,});
    // console.log('hi');
  }


  // -----------------------------------
  return (
    <>
    {/* -- MODAL -- */}
      <div>
        <Modal
          open={isModalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
         >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit todo
            </Typography>
            <form onSubmit={updateTodo} style={{display:'flex', margin:'4px'}}>
              <TextField
                fullWidth
                value={newTodoInput}
                onChange={(e) => setNewTodoInput(e.target.value)}
                id="fullWidth"
              />
              <Button type="submit">Done</Button>
            </form>
          </Box>
        </Modal>    
      </div>

      {/*---- LIST ---- */}
      <div>      
        <ListItem disablePadding>              
          <ListItemButton>
            <ListItemIcon onClick={toggleIsDone}>
            {props.isDone ? <CheckBoxIcon/>: <CheckBoxOutlineBlankIcon/> }
            </ListItemIcon>
            <ListItemText primary={props.todoText} onClick={handleOpen}/>
            <ListItemIcon onClick={deleteTodo}> <DeleteIcon/> </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </div>
    </>  
  )
}
