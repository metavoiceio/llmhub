
export default function PlaygroundHistory({ history }) {
  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
  }

  const showHistory = () => {
    if (history.length === 0) return <p>No history to show</p>;

    return history.map((experiment, idx) => {
      return (
        <div key={`experiment-${idx}`}>
          <div>Created_at: {experiment.created_at}</div>
          <div>Prompt</div>
          <div>{experiment.prompt}</div>
          <div>Output</div>
          <div>{experiment.output}</div>
          <div>
            {experiment.model} &nbsp;
            {JSON.stringify(experiment.config)}
          </div>
          <div className="flex-grow border-b border-gray-400"></div>
        </div>
      )
    });
  }

  return (
    <>
      <button
        data-tooltip-target="tooltip-animation"
        data-drawer-toggle="drawer-right"
        data-drawer-target="drawer-right"
        data-drawer-placement="right"
        aria-controls="drawer-right"
        className="inline-flex items-center justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        onClick={handleClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20px" height="20px"><path fillRule="evenodd" clipRule="evenodd" d="M8.48806 2.39893C10.2466 2.04913 12.072 2.31991 13.6533 3.16512C15.2346 4.01034 16.4739 5.3777 17.1601 7.03422C17.8462 8.69073 17.9368 10.5339 17.4163 12.2497C16.8958 13.9655 15.7965 15.4478 14.3057 16.4439C12.8148 17.44 11.0247 17.8884 9.24037 17.7127C7.456 17.5369 5.78777 16.7479 4.51993 15.4801C4.22703 15.1872 4.22703 14.7123 4.51993 14.4194C4.81282 14.1265 5.28769 14.1265 5.58059 14.4194C6.60304 15.4419 7.94839 16.0782 9.3874 16.2199C10.8264 16.3616 12.27 16 13.4723 15.1967C14.6746 14.3934 15.5611 13.198 15.9809 11.8143C16.4006 10.4306 16.3276 8.94414 15.7743 7.60824C15.2209 6.27234 14.2215 5.16963 12.9462 4.488C11.671 3.80638 10.1989 3.58801 8.78069 3.8701C7.36251 4.1522 6.086 4.9173 5.16869 6.03505C4.35468 7.02693 3.8682 8.24204 3.76896 9.51355L4.51993 8.76258C4.81282 8.46968 5.28769 8.46968 5.58059 8.76258C5.87348 9.05547 5.87348 9.53034 5.58059 9.82324L3.45927 11.9446C3.31862 12.0852 3.12785 12.1642 2.92894 12.1642C2.73003 12.1642 2.53926 12.0852 2.39861 11.9446L0.277287 9.82324C-0.0156062 9.53034 -0.0156061 9.05547 0.277287 8.76258C0.57018 8.46968 1.04505 8.46968 1.33795 8.76258L2.25656 9.68119C2.32567 8.00186 2.93926 6.38715 4.00917 5.08346C5.14664 3.69745 6.72951 2.74872 8.48806 2.39893ZM10 6.25001C10.4142 6.25001 10.75 6.5858 10.75 7.00001V9.57537L12.8859 10.8569C13.2411 11.07 13.3562 11.5307 13.1431 11.8859C12.93 12.2411 12.4693 12.3562 12.1141 12.1431L9.61413 10.6431C9.38823 10.5076 9.25001 10.2635 9.25001 10V7.00001C9.25001 6.5858 9.58579 6.25001 10 6.25001Z" fill="currentColor"></path></svg>‍
      </button>
      <div id="tooltip-animation" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-xs font-medium text-white bg-gray-700 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        Show history
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
      <div
        id="drawer-right"
        className="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-1/2 max-sm:w-full dark:bg-gray-800"
        tabIndex="-1" aria-labelledby="drawer-right-label"
      >
        <h1
          id="drawer-right-label"
          className="inline-flex items-center mb-4 text-xl font-semibold text-gray-500 dark:text-gray-400"
        >
          Plaground History
        </h1>
        <button
          data-drawer-dismiss="drawer-right"
          aria-controls="drawer-right"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          <span className="sr-only">Close menu</span>
        </button>

        {showHistory()}
      </div>
    </>
  )
}
