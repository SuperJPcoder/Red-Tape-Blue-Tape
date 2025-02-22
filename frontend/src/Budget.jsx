import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Budget.css'

const roleOptions = [
  'Secretary',
  'Gen Sec',
  'Faculty Advisor',
  'HoD',
  'Gangu Maam',
  'Deputy Director',
  'Director'
]

export function Budget() {
  const [summary, setSummary] = useState({
    totalBudget: 10000,
    spentBudget: 6000,
    reimbursed: 2000,
    stuck: 500,
    pending: 1500,
    requested: 2500,
    remaining: 1000
  })
  const [subject, setSubject] = useState('')
  const [budgetBoxes, setBudgetBoxes] = useState([
    { id: 1, role: '', note: '', decision: null, tableData: [['']] }
  ])
  const availableRoles = () => {
    const selected = budgetBoxes.map(box => box.role).filter(r => r)
    return roleOptions.filter(role => !selected.includes(role))
  }
  const addBudgetBox = () => {
    if (availableRoles().length > 0) {
      setBudgetBoxes([...budgetBoxes, { id: Date.now(), role: '', note: '', decision: null, tableData: [['']] }])
    }
  }
  const updateBox = (id, field, value) => {
    setBudgetBoxes(budgetBoxes.map(box => box.id === id ? { ...box, [field]: value } : box))
  }
  const updateCell = (boxId, rowIndex, colIndex, value) => {
    setBudgetBoxes(budgetBoxes.map(box => {
      if (box.id === boxId) {
        const newTable = box.tableData.map((row, rIdx) => {
          if (rIdx === rowIndex) {
            return row.map((cell, cIdx) => cIdx === colIndex ? value : cell)
          }
          return row
        })
        return { ...box, tableData: newTable }
      }
      return box
    }))
  }
  const addRow = (boxId) => {
    setBudgetBoxes(budgetBoxes.map(box => {
      if (box.id === boxId) {
        const cols = box.tableData[0] ? box.tableData[0].length : 1
        const newRow = Array(cols).fill('')
        return { ...box, tableData: [...box.tableData, newRow] }
      }
      return box
    }))
  }
  const addColumn = (boxId) => {
    setBudgetBoxes(budgetBoxes.map(box => {
      if (box.id === boxId) {
        const newTable = box.tableData.map(row => [...row, ''])
        return { ...box, tableData: newTable }
      }
      return box
    }))
  }
  const handleSubmit = () => {
    const requestData = {
      subject,
      summary,
      budgetBoxes
    }
    console.log('Submitting Budget Data:', requestData)
  }
  return (
    <div className="budget-page">
      <div className="budget-summary">
        <div className="summary-card">
          <h3>Total Budget</h3>
          <p>{summary.totalBudget}</p>
        </div>
        <div className="summary-card">
          <h3>Spent Budget</h3>
          <p>{summary.spentBudget}</p>
        </div>
        <div className="summary-card">
          <h3>Reimbursed</h3>
          <p>{summary.reimbursed}</p>
        </div>
        <div className="summary-card">
          <h3>Stuck in Reimbursement</h3>
          <p>{summary.stuck}</p>
        </div>
        <div className="summary-card">
          <h3>Pending Money</h3>
          <p>{summary.pending}</p>
        </div>
        <div className="summary-card">
          <h3>Amount Requested</h3>
          <p>{summary.requested}</p>
        </div>
        <div className="summary-card">
          <h3>Amount Remaining</h3>
          <p>{summary.remaining}</p>
        </div>
      </div>
      <div className="budget-subject">
        <input 
          type="text" 
          placeholder="Enter Subject" 
          value={subject} 
          onChange={e => setSubject(e.target.value)} 
        />
      </div>
      <div className="budget-boxes">
        {budgetBoxes.map(box => (
          <div key={box.id} className="budget-box">
            <select value={box.role} onChange={e => updateBox(box.id, 'role', e.target.value)}>
              <option value="">Select Role</option>
              {roleOptions.map(role => (
                <option key={role} value={role} disabled={budgetBoxes.some(b => b.role === role) && box.role !== role}>
                  {role}
                </option>
              ))}
            </select>
            <div className="box-controls">
              <motion.button whileHover={{ scale: 1.1 }} onClick={() => updateBox(box.id, 'decision', 'approved')}>
                Approve
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} onClick={() => updateBox(box.id, 'decision', 'rejected')}>
                Reject
              </motion.button>
            </div>
            <input 
              type="text" 
              placeholder="Add note (optional)" 
              value={box.note} 
              onChange={e => updateBox(box.id, 'note', e.target.value)} 
              className="note-input"
            />
            <div className="custom-table">
              <table>
                <tbody>
                  {box.tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex}>
                          <input 
                            type="text" 
                            value={cell} 
                            onChange={e => updateCell(box.id, rowIndex, colIndex, e.target.value)} 
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="table-controls">
                <motion.button whileHover={{ scale: 1.1 }} onClick={() => addRow(box.id)}>
                  Add Row
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} onClick={() => addColumn(box.id)}>
                  Add Column
                </motion.button>
              </div>
            </div>
          </div>
        ))}
        {availableRoles().length > 0 && (
          <motion.button whileHover={{ scale: 1.1 }} className="add-box-button" onClick={addBudgetBox}>
            Add Box
          </motion.button>
        )}
      </div>
      <motion.button whileHover={{ scale: 1.1 }} className="submit-button" onClick={handleSubmit}>
        Submit
      </motion.button>
    </div>
  )
}
