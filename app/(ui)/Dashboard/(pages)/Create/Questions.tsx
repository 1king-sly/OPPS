import React from 'react'
import Question from './Question'

export default function Questions() {
  return (
    <>
    <div className='gap-2 flex flex-col'>
        <Question number='a' id='Question 1' max={1000} question=' Problem identification and background/Needs assessment' instructions='What issue/challenge/gap does the project aim to address? The objectives should be clear, measureable, realistic and achievable within the duration of the project. For each objective, define appropriate indicators for measuring achievement (including a unit of measurement, baseline value and target value)'></Question>
        <Question number='b' id='Question 2' max={800} question=' Research Purpose and anticipated results'  ></Question>
        <Question number='c' id='Question 3' max={1000} question='Project Design and Methodology' instructions='Outline the approach and methodology behind the project. Explain why they are the most suitable for achieving the project’s objectives.'></Question>
        <Question number='d' id='Question 4' max={1000} question=' Gender Equality, Equity, and Inclusion considerations' ></Question>
    </div>
    </>
  )
}
