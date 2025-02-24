import React, { useState } from 'react';
import TagInput from '../components/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, onClose,showToastMessage,getAllNotes }) => {
    const [tags, setTags] = useState(noteData?.tags||[]);
    const [title, setTitle] = useState(noteData?.title||'');
    const [content, setContent] = useState(noteData?.content||'');
    const [error, setError] = useState('');

    //add note
const addNewNote = async () => {
    try {
        console.log("Adding new note...", { title, content, tags });
        const response = await axiosInstance.post("/add-note", {
            title,
            content,
            tags,
        });

        if (response.data && response.data.note) {
            showToastMessage("success", "Note Added Successfully");
            getAllNotes(); // Appeler la fonction pour récupérer toutes les notes
            onClose(); // Fermer le modal ou la popup
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
            showToastMessage("error", errorMessage);
        } else {
            setError("An unexpected error occurred."); // Gestion d'erreur générique
        }
    }
};

// edit note
const editNote = async () => {
    if (!noteData || !noteData._id) {
        console.error("Error: Note is undefined or missing _id");
        setError("Cannot update note: No note selected.");
        showToastMessage("error", "Cannot update note: No note selected.");
        return;
    }

    const noteId = noteData._id;
    console.log("Editing note...", { noteId, title, content, tags });

    try {
        const response = await axiosInstance.put(`/edit-note/${noteId}`, {
            title,
            content,
            tags,
        });

        console.log("Response received:", response.data);

        if (response.data) {
            console.log("Note updated successfully.");
            showToastMessage("success", "Note Updated Successfully");
            getAllNotes();
            onClose();
        }
    } catch (error) {
        console.error("Error occurred while updating note:", error);
        setError(error.response?.data?.message || "An unexpected error occurred.");
        showToastMessage("error", errorMessage);
    }
};

    const handleAddNote = () => {
        if (!title) {
            setError("please enter note title");
            return;
        }
        if (!content) {
            setError("please enter note content");
            return;
        }
        setError("");

        if (type === "edit") {
            editNote();
        }
        else {
            addNewNote();
        }
    };


    return (
        <div className="relative ">
            {/* BOUTON DE FERMETURE */}
            <button
                className="w-10 h-10 flex items-center justify-center absolute top-0 right-0 hover:bg-slate-500 rounded-full"
                onClick={onClose}
            >
                <MdClose className="text-xl text-slate-400" />
            </button>

            {/* TITLE */}
            <div className="flex flex-col gap-4">
                <label htmlFor="title" className="text-sm font-medium text-slate-600">TITLE</label>
                <input
                    id="title"
                    type="text"
                    className="text-base text-slate-950 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter note title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col gap-3">
                <label htmlFor="content" className="text-sm font-medium text-slate-600">CONTENT</label>
                <textarea
                    id="content"
                    className="text-sm text-slate-950 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Enter note content..."
                    rows="5"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            {/* TAGS */}
            <div>
                <label htmlFor="tags" className="text-sm font-medium text-slate-600">TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className="text-red-500 text-sm pt-4">{error}</p>}

            {/* ADD BUTTON */}
            <button
                className="bg-blue-500 font-medium w-full p-2 rounded-md text-white hover:bg-blue-600 transition-colors"
                onClick={handleAddNote}
            >
                {type ==='edit'?'Update':'Add'}
            </button>

        </div>
    );
};

export default AddEditNotes;










