import { Box } from '@chakra-ui/react';
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective } from '@syncfusion/ej2-react-navigations';
function SyncfusionAccordion() {
    return (
        <AccordionComponent expandMode='Multiple' >
            <AccordionItemsDirective>
                <AccordionItemDirective header='A1'content={A1Content} />
                <AccordionItemDirective header='A2'content={A2Content} />
                <AccordionItemDirective header='A3'content={A3Content} />
            </AccordionItemsDirective>
        </AccordionComponent>
    )

    function A1Content(){
        return(<Box>A1 content</Box>)
    }

    function A2Content(){
        return(<Box>A2 content</Box>)
    }

    function A3Content(){
        return(<Box>A3 content</Box>)
    }
}
export { SyncfusionAccordion }