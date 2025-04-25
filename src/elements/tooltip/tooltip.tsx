import React, { ReactElement } from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

interface TooltipGeneralInterface {
    children: ReactElement,
    text: string
}

const TooltipGeneral: React.FC<TooltipGeneralInterface>= ({  children, text }) =>{
    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
          {text}
        </Tooltip>
    );

    return (
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          {children}
        </OverlayTrigger>
      );
}

export default TooltipGeneral