import React from 'react'
import './Analyticspage.css'
const box1=[
  "Backlog Task",
  "To-do Task",
  "In-Progress Task",
  "Completed Task"
]
const box2=[
  "Low Priority",
  "Moderate Priority",
  "High Priority",
  "Due to Task"
]

const AnalyticsPage = () => {
  return (
    <div>
       <h3>Analytics</h3>
       <div className="full-content">
        <div className="box">
       
        {
            box1.map((item)=>{
              return(
                <div className="taskRow">
                <span
                  className="dot"
                  
                ></span>
                <span>{item}</span>
                <span className="taskCount">
                  10
                </span>
              </div>
              )
            })
          }
        </div>
        <div className="box">
   
        {
            box2.map((item)=>{
              return(
                <div className="taskRow">
                <span
                  className="dot"
                  
                ></span>
                <span>{item}</span>
                <span className="taskCount">
                  10
                </span>
              </div>
              )
            })
          }
     
        </div>
       

       </div>
      </div>
  )
}

export default AnalyticsPage