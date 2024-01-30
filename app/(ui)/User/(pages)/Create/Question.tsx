import React from 'react';

interface QuestionProps {
  question: string;
  instructions?: string;
  max: number;
  id: string;
  number: string;
  name:string;
  value?:string,
  onChange?:((event:any)=>void)
  disabled?:boolean
  
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
      <div>
        <textarea
          id={id}
          maxLength={max * 3}
          title={id}
          className='resize-none min-h-60 w-full px-2 py-2 outline-sky-200 mt-3 max-h-fit'
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
        ></textarea>
      </div>

      
    </>
  );
}
