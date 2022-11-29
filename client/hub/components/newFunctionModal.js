import { Button, Modal, TextInput } from "flowbite-react"

// TODO sidroopdaska: handle empty submit
export default function NewFunctionModal({
  show, onClose, handleCreateFunction, newFunctionName, setNewFunctionName
}) {
  const handleClose = (_event) => {
    setNewFunctionName('');
    onClose();
  }

  return (
    <Modal
      show={show}
      size="md"
      popup={true}
      onClose={handleClose}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Create New Function
          </h3>
          <div>
            <TextInput
              id="newfuction"
              placeholder="Enter a name"
              required={true}
              onChange={event => setNewFunctionName(event.target.value)}
              value={newFunctionName}
            />
          </div>
          <div className="w-full">
            <Button onClick={handleCreateFunction}>
              Create
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
