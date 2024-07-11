import React from 'react'
import '../../css/components/chat_group/newChannelForm.scss'
import ValidateButton from '../validateButton'

function NewChannelForm({
    handleCreateChannel,
    handleNewChannelName,
    handleNewChannelDescription,
    newChannelDecription,
    newChannelName,
    toggleNewChannelForm}) {

      const SubmitChannel = () => {
        handleCreateChannel()
        toggleNewChannelForm()
      }
  return (
    <div className='new-channel-container'>

      <div className="new-channel-content">

        <div className="title">
          <h3>New channel</h3>newChannelName
        </div>

        <div className="inputs">
          <input
            className='input-name'
            type='text'
            placeholder='Channel name'
            onChange={handleNewChannelName}
            value={newChannelName}
          />
          <textarea
            class="input-description"
            placeholder="Description"
            value={newChannelDecription}
            onChange={handleNewChannelDescription}>
          </textarea>
        </div>

          <div className="button" onClick={() => {SubmitChannel()}}>
            <ValidateButton text='save' />
          </div>

      </div>

    </div>
  )
}

export default NewChannelForm
