import {Link} from 'gatsby';
import React from 'react';
import headerStyles from './header.module.scss';

interface HeaderProps {
    siteTitle: string;
}

export default class Header extends React.Component<HeaderProps, {}> {

    constructor(props: HeaderProps, context: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return <header className={headerStyles.header}>
            <div>
                <h1>
                    <Link to='/'>{this.props.siteTitle}</Link>
                </h1>
            </div>
        </header>;
    }
}
