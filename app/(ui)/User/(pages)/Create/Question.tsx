import React from 'react';

interface QuestionProps {
  question: string;
  instructions?: string;
  max: number;
  id: string;
  number: string;
  name:string;
  value?:string,
  onChange?:((event:any)=>void);
  disabled?:boolean;
  attach?:boolean
  
}

export default function Question({
  question,
  instructions,
  max,
  id,
  number,
  value,
  onChange,
  name,
  disabled,
  attach
}: QuestionProps) {
 

  return (
    <>
      <div>
        <p>
          <span>{number}) </span>
          {question} <span>( Max {max} words) </span>{' '}
        </p>
        <p className='text-sm'>{instructions} </p>
      </div>
      <div className='relative'>
        <textarea
          id={id}
          minLength={max}
          maxLength={max * 3}
          title={id}
          className='resize-none min-h-60 w-full px-2 py-2 outline-sky-200 mt-3 max-h-fit '
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          required={true}
          autoFocus
          placeholder='Type here'
        ></textarea>

        {attach?(
          <>
          <div className=' absolute bottom-0 right-0 '>
              <input type="file" accept='.pdf' className=' text-xs '  title='file_upload'/>
          </div>
          
          </>

        ):null}
      </div>

      
    </>
  );
}
