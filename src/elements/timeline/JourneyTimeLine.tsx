import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { JourneyInterface } from '../../types/journey';
import Tag from '../tag/tag';
import { capitalizeFirstChar } from '../../lib/util/string';
import { formatDate } from '../../lib/util/date';

interface JourneyVertcialTimeLineInterface {
    journeys: JourneyInterface[]
}

const JourneyVertcialTimeLine: React.FC<JourneyVertcialTimeLineInterface> = ({ journeys }) =>{

    return (
        <>
            <VerticalTimeline layout='1-column-left'  lineColor='#eeeeee'>
                {journeys.map(journey=>(
                    <VerticalTimelineElement
                        key={journey.id}
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'rgb(223, 237, 249)', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(223, 237, 249)' }}
                        date={formatDate(journey.date)}
                        iconStyle={{ background: 'rgb(223, 237, 249)', color: '#fff' }}
                        icon={<AcademicCapIcon />}
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
                
                {/* <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2010 - 2011"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<AcademicCapIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Art Director</h3>
                    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                    <p>
                    Creative Direction, User Experience, Visual Design, SEO, Online Marketing
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2008 - 2010"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<AcademicCapIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Web Designer</h3>
                    <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
                    <p>
                    User Experience, Visual Design
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2006 - 2008"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<AcademicCapIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Web Designer</h3>
                    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                    <p>
                    User Experience, Visual Design
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="April 2013"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    icon={<AcademicCapIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
                    <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
                    <p>
                    Strategy, Social Media
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="November 2012"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    icon={<AcademicCapIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
                    <h4 className="vertical-timeline-element-subtitle">Certification</h4>
                    <p>
                    Creative Direction, User Experience, Visual Design
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2002 - 2006"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    icon={<AcademicCapIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
                    <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
                    <p>
                    Creative Direction, Visual Design
                    </p>
                </VerticalTimelineElement> */}
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