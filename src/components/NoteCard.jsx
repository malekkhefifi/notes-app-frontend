import moment from 'moment';
import React from 'react';
import { MdOutlinePushPin } from 'react-icons/md';
import { MdCreate, MdDelete } from 'react-icons/md';
import { data } from 'react-router-dom';

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
    return (
        <div className='border rounded p-4 bg-white hover: shadow-xl trasition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-sm font-medium'>{title}</h6>
                    <span className='text-xs text-slate-500'>{moment(date).format('Do MMM YYYY')}</span>


                </div>

                <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-blue-500' : 'text-slate-300'}`} onClick={onPinNote} />
            </div>

            <p className='text-xs text-slate-600 mt-2  '>{content?.slice(0, 60)}</p>

            <div className='flex items-center justify-between mt-2'>
                <div className='text-xs text-slate-500'>
                    {tags?.length > 0 ? (
                        tags.map((item, index) => <span key={index}>#{item} </span>)
                    ) : (
                        <span className="text-gray-400">No tags</span>
                    )}
                </div>



                <div className='flex items-center gap-2'>
                    <MdCreate className='icon-btn hover:text-green-600'
                        onClick={onEdit}
                    />
                    <MdDelete className='icon-btn hover:text-red-500'
                        onClick={onDelete}
                    />

                </div>
            </div>
        </div>
    )
}

export default NoteCard