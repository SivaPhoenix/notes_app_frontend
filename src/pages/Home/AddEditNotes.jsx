import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';

const AddEditNotes = ({noteDown , type,onClose}) => {



  const [title,setTitle]=useState("");
  const [content, setContent]=useState("");
  const [tags, setTags]=useState([]);
  const [error, setError]=useState(null);

  //Add notes
  const addNewNote=async()=>{};
  //Edit notes
  const editNote=async()=>{};
  const handleAddNote =  () => {
    if(!title){
      setError("Title is required");
      return;
    }
    if(!content){
      setError("Content is required");
      return;
    }
    
    setError(null);

    if(type==='edit'){
      editNote();
    }
    else{
      addNewNote();
    }
  }

  return (
    <div className='relative'>

      <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
        <MdClose className="text-xl text-slate-400"/>
      </button>
        <div className="flex flex-col gap-2">
            <label className='input-label'>Title</label>
            <input 
            type="text" 
            className="text-2xl text-slate-950" 
            placeholder="Enter Title"
            value={title}
            onChange={({target})=>setTitle(target.value)}
            />
        </div>
        <div className="flex flex-col gap-2 mt-4">
            <label className='input-label'>Content</label>
            <textarea type="text" className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded" 
            placeholder="Enter Content" 
            rows={10}
            value={content}
            onChange={({target})=>setContent(target.value)}
            />
        </div>
        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>

        {error && <p className='text-red-500 text-xs pt-2 pb-1'>{error}</p>}
        <button className='btn-primary font-medium mt-5 p-3 ' onClick={handleAddNote}>ADD</button>
    
    </div>
  )
}

export default AddEditNotes