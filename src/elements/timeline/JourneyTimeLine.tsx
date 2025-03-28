import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { JourneyInterface } from '../../types/journey';
import Tag from '../tag/tag';
import { capitalizeFirstChar } from '../../lib/util/string';
import { formatDate } from '../../lib/util/date';

interface JourneyVertcialTimeLineInterface {
    journeys: JourneyInterface[]
    handleOpen: (id: string)=> void
}

const JourneyVertcialTimeLine: React.FC<JourneyVertcialTimeLineInterface> = ({ journeys, handleOpen }) =>{

    return (
        <>
            <VerticalTimeline layout='1-column-left'  lineColor='#eeeeee'>
                {journeys
                    .sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime())
                   .map(journey=>(
                    <VerticalTimelineElement
                        key={journey.id}
                        className="vertical-timeline-element--work cursor-pointer"
                        contentStyle={{ background: 'rgb(223, 237, 249)', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(223, 237, 249)' }}
                        date={formatDate(journey.date)}
                        iconStyle={{ background: 'rgb(223, 237, 249)', color: '#fff' }}
                        icon={<AcademicCapIcon />}
                        onTimelineElementClick={()=>handleOpen(journey.id)}
                    >
                        <h3 className="vertical-timeline-element-title text-bold">{capitalizeFirstChar(journey.name)}</h3>
                        <h4 className="vertical-timeline-element-subtitle text-[15px] mt-3">{journey.description}</h4>
                        <div className='flex flex-row gap-2 mt-3'>
                            {journey.tags.map(tag=>(
                                <Tag key={tag} text={tag} toDelete={false}/>
                            ))}
                            {/* Creative Direction, User Experience, Visual Design, Project Management, Team Leading */}
                       </div>
                    </VerticalTimelineElement>

                ))}
                
                <VerticalTimelineElement
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    icon={<AcademicCapIcon />}
                    contentStyle={{ background: 'rgb(223, 237, 249)', color: '#000' }}
                >
                    <h4 className="vertical-timeline-element-subtitle text-[15px] mt-3">{'Your Journey Starts Here'}</h4>
                </VerticalTimelineElement>
            </VerticalTimeline>

        </>
    )
}

export default JourneyVertcialTimeLine