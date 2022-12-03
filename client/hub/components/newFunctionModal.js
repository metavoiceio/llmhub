import { Button, Modal } from "flowbite-react"

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
          <form className="space-y-6" onSubmit={handleCreateFunction}>
            <div className="space-y-3">
              <div className="relative">
                {/* Function name */}
                <input
                  type="text"
                  id="fn_name"
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required={true}
                  onChange={event => setNewFunctionName(event.target.value)}
                  value={newFunctionName}
                />
                <label
                  htmlFor="fn_name"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Function name
                </label>
              </div>

              {/* function URL */}
              <div className="relative">
                <input
                  type="text"
                  id="fork_fn"
                  aria-describedby="fork_fn_helper"
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="fork_fn"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Function URL
                </label>
              </div>
              <p
                id="fork_fn_helper"
                className="mt-2 text-xs text-gray-500 dark:text-gray-400"
              >
                Public URL of the function you would like to fork
              </p>
            </div>
            <div className="w-full">
              <Button type="submit">
                Create
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  )
}
