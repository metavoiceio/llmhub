import { useState } from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline'
import { ATTR_FRIENDLY_NAME_INDEX } from '../common/constants';
import Drawer from 'react-modern-drawer';
const moment = require('moment');

export default function PlaygroundHistory({ history, currentDeployment }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsOpen(true);
  }

  const renderTimelineContent = () => {
    if (history.length === 0) return <p>No history to show</p>;

    return history.map((experiment, idx) => {

      const numNewLines = experiment.prompt.split(/\r\n|\r|\n/).length;
      return (
        <TimelineEvent
          key={`experiment-${idx}`}
          createdAt={
            <span>
              {moment(experiment.created_at).format("MMMM Do YYYY, h:mm:ss")}&nbsp;
              {
                currentDeployment && currentDeployment.experiment_id === experiment.id ?
                  <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Deployed</span>
                  : null
              }
            </span>
          }
          showContent={idx === 0}
          icon={currentDeployment && currentDeployment.experiment_id === experiment.id ? <span>🚀</span> : null}
          iconColor={currentDeployment && currentDeployment.experiment_id === experiment.id ? '#0c9f6e' : '#ff9800'}
          bubbleStyle={{ backgroundColor: '#fff' }}
          collapsible
        >
          <div>
            <div className='border border-gray-300 rounded'>
              <textarea
                readOnly
                rows={numNewLines >= 10 ? 10 : numNewLines}
                className="w-[100%] text-xs font-normal text-gray-900 dark:text-gray-400 border-none border-transparent focus:border-transparent focus:ring-0"
              >
                {experiment.prompt}
              </textarea>
            </div>
            <div className='p-2 text-xs mt-1 border border-gray-300 rounded flex'>
              <div className='flex flex-col flex-1'>
                <div>
                  {experiment.output}
                </div>
              </div>
              <div className='flex flex-col border-l border-gray-400 pl-2'>
                <div className='flex'>
                  <div className='min-w-[10ch]'>Model</div>
                  <div>{experiment.model}</div>
                </div>
                {Object.entries(experiment.config).map(([key, value], index) => {
                  return (
                    <div className='flex' key={index}>
                      <div className='min-w-[10ch] flex-1'>{ATTR_FRIENDLY_NAME_INDEX[key]}</div>
                      <div>{value}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </TimelineEvent>
      )
    });
  }

  return (
    <>
      {/* drawer button */}
      <button
        data-tooltip-target="show-history-tooltip"
        className="inline-flex items-center justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        onClick={handleClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20px" height="20px"><path fillRule="evenodd" clipRule="evenodd" d="M8.48806 2.39893C10.2466 2.04913 12.072 2.31991 13.6533 3.16512C15.2346 4.01034 16.4739 5.3777 17.1601 7.03422C17.8462 8.69073 17.9368 10.5339 17.4163 12.2497C16.8958 13.9655 15.7965 15.4478 14.3057 16.4439C12.8148 17.44 11.0247 17.8884 9.24037 17.7127C7.456 17.5369 5.78777 16.7479 4.51993 15.4801C4.22703 15.1872 4.22703 14.7123 4.51993 14.4194C4.81282 14.1265 5.28769 14.1265 5.58059 14.4194C6.60304 15.4419 7.94839 16.0782 9.3874 16.2199C10.8264 16.3616 12.27 16 13.4723 15.1967C14.6746 14.3934 15.5611 13.198 15.9809 11.8143C16.4006 10.4306 16.3276 8.94414 15.7743 7.60824C15.2209 6.27234 14.2215 5.16963 12.9462 4.488C11.671 3.80638 10.1989 3.58801 8.78069 3.8701C7.36251 4.1522 6.086 4.9173 5.16869 6.03505C4.35468 7.02693 3.8682 8.24204 3.76896 9.51355L4.51993 8.76258C4.81282 8.46968 5.28769 8.46968 5.58059 8.76258C5.87348 9.05547 5.87348 9.53034 5.58059 9.82324L3.45927 11.9446C3.31862 12.0852 3.12785 12.1642 2.92894 12.1642C2.73003 12.1642 2.53926 12.0852 2.39861 11.9446L0.277287 9.82324C-0.0156062 9.53034 -0.0156061 9.05547 0.277287 8.76258C0.57018 8.46968 1.04505 8.46968 1.33795 8.76258L2.25656 9.68119C2.32567 8.00186 2.93926 6.38715 4.00917 5.08346C5.14664 3.69745 6.72951 2.74872 8.48806 2.39893ZM10 6.25001C10.4142 6.25001 10.75 6.5858 10.75 7.00001V9.57537L12.8859 10.8569C13.2411 11.07 13.3562 11.5307 13.1431 11.8859C12.93 12.2411 12.4693 12.3562 12.1141 12.1431L9.61413 10.6431C9.38823 10.5076 9.25001 10.2635 9.25001 10V7.00001C9.25001 6.5858 9.58579 6.25001 10 6.25001Z" fill="currentColor"></path></svg>‍
      </button>
      <div
        id="show-history-tooltip"
        role="tooltip"
        className="inline-block absolute invisible z-10 py-2 px-3 text-xs font-medium text-white bg-gray-700 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
      >
        Show history
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>

      {/* drawer */}
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        direction='right'
        className='p-4 overflow-y-auto min-w-[75vw] break-words'
      >
        <div>
          <Timeline lineColor='#d8dee4'>
            {renderTimelineContent()}
          </Timeline>
        </div>
      </Drawer>
    </>
  )
}
