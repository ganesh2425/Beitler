import React from "react";
import { BoxBody, PageContent } from "../../utilities/common";
import Mdsentry from "./Forms/MdsEntry";


type IProps = {
    header: string
}
type IState = {
    setLgShow: boolean
}

class AccordionLayout extends React.Component<IProps, IState>{

    readonly state = {
        setLgShow: false,
        // column: columns
    };

    showModal = (id: number): void => {
        console.log(id)
        this.setState({ setLgShow: true })
    }

    openModal = (): void => {
        this.setState({ setLgShow: true })
    }

    render(): JSX.Element {
        // const { header } = this.props;
        // const { setLgShow } = this.state;
        return (
            <>
            <PageContent>
            <BoxBody>
            <Mdsentry />
            </BoxBody>
            </PageContent>
           
            </>
        );
    }
}

export default AccordionLayout;