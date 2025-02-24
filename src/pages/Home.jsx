import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Toast from '../components/Toast';
import EmptyCard from '../components/Emptycard';



const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: "",
    message: "",
  });
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  }
  const openModal = () => {
    setOpenAddEditModal({ isShown: true, type: "add", data: null });
  };

  const closeModal = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };

  const showToastMessage = (type, message) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });

    setTimeout(() => {
      setShowToastMsg({ isShown: false, message: "", type: "" });
    }, 3000);
  };
  /**************************Get User Info */
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      console.log("User info:", response.data.user);
      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  /************************Get All Notes */
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      setAllNotes(response.data);
      console.log("All notes fetched:", response.data);

    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };
  /************************Delete Note */
  const deleteNote = async (data) => {
    if (!data || !data._id) {
      showToastMessage("error", "Cannot delete note: No note selected.");
      return;
    }

    const noteId = data._id;

    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);

      console.log("Response received:", response.data);

      if (response.data && !response.data.error) {
        console.log("Note deleted successfully.");
        showToastMessage("delete", "Note Deleted Successfully");
        getAllNotes();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      console.log(errorMessage);
      showToastMessage("error", errorMessage);
    }
  };

  /*************************Search for a Note */
  const onSearchNote = async (query) => {
    if (!query) {
      setIsSearch(false);
      getAllNotes(); // Get all notes if no query is entered
      return;
    }

    try {
      const response = await axiosInstance.get("/search-notes/", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Search error: ", error);
    }
  };

/************************Update pinned */
const updateIsPinned = async (noteData) => {
  const noteId = noteData._id;
  try {
    const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, {
      "isPinned": !noteData.isPinned, // Corrected this part
    });

    if (response.data) {
      console.log("Note updated successfully.");
      showToastMessage("success", "Note Updated Successfully");
      getAllNotes();
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);
  //console.log(allNotes)

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} />
      <div className="container mx-auto text-center">
        {allNotes.length === 0 ? (
          <EmptyCard
            imgSrc={
              isSearch && allNotes.length === 0
                ? "https://static.vecteezy.com/system/resources/previews/007/872/974/non_2x/file-not-found-illustration-with-confused-people-holding-big-magnifier-search-no-result-data-not-found-concept-can-be-used-for-website-landing-page-animation-etc-vector.jpg"  // Your NoData image
                : "https://th.bing.com/th/id/OIP.phpfxRPZYcRDlCtVDpxLBwHaHz?rs=1&pid=ImgDetMain"
            }
            message={
              isSearch && allNotes.length === 0 ? (
                <>
                  <p className="mb-2 text-gray-600">Oops! No notes found matching your search.</p>
                  <img
                    src="https://th.bing.com/th/id/OIP.phpfxRPZYcRDlCtVDpxLBwHaHz?rs=1&pid=ImgDetMain"
                    alt="No notes found"
                    className="mx-auto w-40 h-40"
                  />
                </>
              ) : (
                "Start creating your first note! Click 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!"
              )
            }
          />
        ) : (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 fixed right-5 bottom-10"
        onClick={openModal}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
          content: {
            width: '40%',
            maxHeight: '75%',
            backgroundColor: 'white',
            borderRadius: '8px',
            margin: 'auto',
            padding: '20px',
            overflow: 'auto',
          },
        }}
        contentLabel="Add/Edit Note"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={closeModal}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={() => setShowToastMsg({ isShown: false, message: "", type: "" })}
      />
    </>
  );
};

export default Home;
