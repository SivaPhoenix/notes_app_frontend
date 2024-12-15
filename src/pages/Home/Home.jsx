import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import ToastMessage from '../../components/ToastMessage/ToastMessage';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import AddNotesImg from "../../assets/add-note.svg"

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg,setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add", // or "error"
  })
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  //edit 
  const handleEdit=(noteDetails)=>{
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: noteDetails,
    })
  }

  const showToastMessage=(message,type)=>{
    setShowToastMsg({
      isShown: true, 
      message, 
      type,
    })
  }

  const handleCloseToast=()=>{
    setShowToastMsg({
      isShown: false, 
      message: "", 
      // type: ""
    })
  }

  // Get user information
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updatedIsPinned = async (noteData) => {
    try {
      const response = await axiosInstance.put(`/update-isPinned/${noteData._id}`, {
        isPinned:!noteData.isPinned,
      });
      if (response.data && response.data.message) {
        showToastMessage("Pinned status updated successfully",'update');
        updatedIsPinned();
      }
    } catch (error) {
      console.error(error);
      showToastMessage("An error occurred while updating pinned status.", "error");
    }
  }

  //delete notes
  const deleteNode=async(data)=>{
    try {
      const response = await axiosInstance.delete(`/delete-note/${data._id}`);
      if (response.data && response.data.message) {
        showToastMessage("Note Deleted Successfully",'delete');
        getAllNotes();
      }
    } catch (error) {
      console.error(error);
      showToastMessage("An error occurred while deleting note.", "error");
    }
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className='container mx-auto'>
        {allNotes.length>0?<div className='grid grid-cols-3 gap-4 mt-8'>
          {allNotes.map((item, index) => {
            return (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNode(item)}
                onPinMode={() => updatedIsPinned(item)}
              />
            );
          })}
        </div>:<EmptyCard imgSrc={AddNotesImg} message={`Start creating your first Note! Click the 'Add' button to ot down your thought. Let;s get started `}/>}
      </div>

      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
        }}
        contentLabel=""
        className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <ToastMessage
      isShown={showToastMsg.isShown}
      message={showToastMsg.message}
      type={showToastMsg.type}
      onClose={handleCloseToast}/>
    </>
  );
}

export default Home;
