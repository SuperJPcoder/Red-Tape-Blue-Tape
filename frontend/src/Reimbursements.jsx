import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Reimbursements.css'

const roleOptions = [
  'Secretary',
  'Gen Sec',
  'Faculty Advisor',
  'HoD',
  'Gangu Maam',
  'Deputy Director',
  'Director'
]

export function Reimbursements() {
  const [studentDetails, setStudentDetails] = useState('')
  const [reimbursementDate, setReimbursementDate] = useState('')
  const [reimbursementBoxes, setReimbursementBoxes] = useState([{ id: 1, role: '', note: '', file: null, tableData: [['']] }])
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    ifsc: '',
    accountHolder: ''
  })
  const [finalDecision, setFinalDecision] = useState(null)
  const availableRoles = () => {
    const selected = reimbursementBoxes.map(box => box.role).filter(r => r)
    return roleOptions.filter(role => !selected.includes(role))
  }
  const addReimbursementBox = () => {
    if (availableRoles().length > 0) {
      setReimbursementBoxes([...reimbursementBoxes, { id: Date.now(), role: '', note: '', file: null, tableData: [['']] }])
    }
  }
  const updateBox = (id, field, value) => {
    setReimbursementBoxes(reimbursementBoxes.map(box => box.id === id ? { ...box, [field]: value } : box))
  }
  const updateCell = (boxId, rowIndex, colIndex, value) => {
    setReimbursementBoxes(reimbursementBoxes.map(box => {
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
    setReimbursementBoxes(reimbursementBoxes.map(box => {
      if (box.id === boxId) {
        const cols = box.tableData[0] ? box.tableData[0].length : 1
        const newRow = Array(cols).fill('')
        return { ...box, tableData: [...box.tableData, newRow] }
      }
      return box
    }))
  }
  const addColumn = (boxId) => {
    setReimbursementBoxes(reimbursementBoxes.map(box => {
      if (box.id === boxId) {
        const newTable = box.tableData.map(row => [...row, ''])
        return { ...box, tableData: newTable }
      }
      return box
    }))
  }
  const handleFileUpload = (boxId, file) => {
    updateBox(boxId, 'file', file)
  }
  const handleBankDetails = (field, value) => {
    setBankDetails({ ...bankDetails, [field]: value })
  }
  const handleFinalDecision = (decision) => {
    setFinalDecision(decision)
    console.log('Final Decision:', decision)
  }
  const handleSubmit = () => {
    const requestData = {
      studentDetails,
      reimbursementDate,
      reimbursementBoxes,
      bankDetails,
      finalDecision
    }
    console.log('Submitting Reimbursement Data:', requestData)
  }
  return (
    <div className="reimbursement-page">
      <div className="header-section">
        <input 
          type="text" 
          placeholder="Enter Student Details" 
          value={studentDetails} 
          onChange={e => setStudentDetails(e.target.value)} 
        />
        <input 
          type="date" 
          placeholder="Select Date" 
          value={reimbursementDate} 
          onChange={e => setReimbursementDate(e.target.value)} 
        />
      </div>
      <div className="boxes-section">
        {reimbursementBoxes.map(box => (
          <div key={box.id} className="reimbursement-box">
            <select value={box.role} onChange={e => updateBox(box.id, 'role', e.target.value)}>
              <option value="">Select Role</option>
              {roleOptions.map(role => (
                <option key={role} value={role} disabled={reimbursementBoxes.some(b => b.role === role) && box.role !== role}>
                  {role}
                </option>
              ))}
            </select>
            <input 
              type="text" 
              placeholder="Add note (optional)" 
              value={box.note} 
              onChange={e => updateBox(box.id, 'note', e.target.value)} 
              className="note-input"
            />
            <div className="file-upload">
              <label htmlFor={`file-${box.id}`}>Upload Bill:</label>
              <input 
                id={`file-${box.id}`} 
                type="file" 
                onChange={e => handleFileUpload(box.id, e.target.files[0])}
              />
            </div>
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
          <motion.button whileHover={{ scale: 1.1 }} className="add-box-button" onClick={addReimbursementBox}>
            Add Box
          </motion.button>
        )}
      </div>
      <div className="bank-section">
        <h3>Receiver Bank Details</h3>
        <input 
          type="text" 
          placeholder="Bank Name" 
          value={bankDetails.bankName} 
          onChange={e => handleBankDetails('bankName', e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Account Number" 
          value={bankDetails.accountNumber} 
          onChange={e => handleBankDetails('accountNumber', e.target.value)}
        />
        <input 
          type="text" 
          placeholder="IFSC Code" 
          value={bankDetails.ifsc} 
          onChange={e => handleBankDetails('ifsc', e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Account Holder" 
          value={bankDetails.accountHolder} 
          onChange={e => handleBankDetails('accountHolder', e.target.value)}
        />
      </div>
      <div className="final-decision">
        <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleFinalDecision('approved')}>
          Approve
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleFinalDecision('rejected')}>
          Reject
        </motion.button>
      </div>
      <motion.button whileHover={{ scale: 1.1 }} className="submit-button" onClick={handleSubmit}>
        Submit
      </motion.button>
    </div>
  )
}
