import React, { ReactElement } from "react"
import { Placement } from "react-bootstrap/esm/types";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

interface TooltipGeneralInterface {
    children: ReactElement,
    text: string,
    placement: Placement | undefined
}

const TooltipGeneral: React.FC<TooltipGeneralInterface>= ({  children, text, placement }) =>{
    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
          {text}
        </Tooltip>
    );

    return (
        <OverlayTrigger
          placement={placement}
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          {children}
        </OverlayTrigger>
      );
}

export default TooltipGeneral