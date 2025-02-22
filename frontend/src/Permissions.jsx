import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Permissions.css'

const roleOptions = [
  'Secretary',
  'Gen Sec',
  'Faculty Advisor',
  'HoD',
  'Gangu Maam',
  'Deputy Director',
  'Director'
]

export function Permissions() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [permissionBoxes, setPermissionBoxes] = useState([{ id: 1, role: '', note: '', decision: null }])
  const availableRoles = () => {
    const selected = permissionBoxes.map(box => box.role).filter(r => r)
    return roleOptions.filter(role => !selected.includes(role))
  }
  const addPermissionBox = () => {
    if (availableRoles().length > 0) {
      setPermissionBoxes([...permissionBoxes, { id: Date.now(), role: '', note: '', decision: null }])
    }
  }
  const updateBox = (id, field, value) => {
    setPermissionBoxes(permissionBoxes.map(box => box.id === id ? { ...box, [field]: value } : box))
  }
  const handleFormat = (command) => {
    document.execCommand(command, false, null)
  }
  const handleHighlight = () => {
    document.execCommand('backColor', false, 'lightyellow')
  }
  return (
    <div className="permissions-page">
      <h1 className="page-title">Permissions</h1>
      <div className="permission-form">
        <input 
          type="text" 
          className="title-input" 
          placeholder="Enter Title/Subject" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />
        <div className="editor-controls">
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleFormat('bold')}>Bold</motion.button>
          <motion.button whileHover={{ scale: 1.1 }} onClick={handleHighlight}>Highlight</motion.button>
        </div>
        <div 
          className="body-editor" 
          contentEditable
          suppressContentEditableWarning={true}
          onInput={e => setBody(e.currentTarget.innerHTML)}
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
      </div>
      <div className="permission-boxes-container">
        {permissionBoxes.map(box => (
          <div key={box.id} className="permission-box">
            <select 
              value={box.role} 
              onChange={e => updateBox(box.id, 'role', e.target.value)}
            >
              <option value="">Select Role</option>
              {roleOptions.map(role => (
                <option key={role} value={role} disabled={permissionBoxes.some(b => b.role === role) && box.role !== role}>
                  {role}
                </option>
              ))}
            </select>
            <div className="decision-buttons">
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
          </div>
        ))}
        {availableRoles().length > 0 && (
          <motion.button whileHover={{ scale: 1.1 }} className="add-box-button" onClick={addPermissionBox}>Add Role</motion.button>
        )}
      </div>
    </div>
  )
}
