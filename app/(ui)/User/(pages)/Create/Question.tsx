// Question.tsx
import React, { ChangeEvent } from 'react';

interface QuestionProps {
  question: string;
  instructions?: string;
  max: number;
  id: string;
  number: string;
  value?:string,
  onChange?:((event:any)=>void)
  // onInputChange: (id: string, value: string) => void;
}

export default function Question({
  question,
  instructions,
  max,
  id,
  number,
  value,
  onChange
  // onInputChange,
}: QuestionProps) {
  // const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //   const { value } = event.target;
  //   onInputChange(id, value);
  // };

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
          name={id}
          id={id}
          maxLength={max}
          title={id}
          className='resize-none h-60 w-full px-2 py-2 outline-sky-200 mt-3'
          value={value}
          onChange={onChange}
          // onChange={handleInputChange}
        ></textarea>
      </div>
    </>
  );
}
