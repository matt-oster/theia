/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import * as React from 'react';

export interface OutputHeaderProps {
    onSelect: (selectedName: string) => void;
    selectableNames: string[];
}

export class OutputHeader extends React.Component<OutputHeaderProps, {}> {
    private readonly OUTPUT_HEADER_ID = 'outputContents';
    private readonly NONE = '<no channels>';

    constructor(props: OutputHeaderProps) {
        super(props);
    }

    public render() {
        return (
            <div id={this.OUTPUT_HEADER_ID}>
                <select id='outputChannelList' onChange={event => { this.selectChannel(event.target as HTMLSelectElement); }}>
                    { this.getSelectOptions() }
                </select>
            </div>
        );
    }

    /**
     * Builds the list of options for the select element.
     */
    private getSelectOptions(): React.ReactNode[] {
        const channelOptionElements: React.ReactNode[] = [];
        if (this.props.selectableNames.length === 0) {
            channelOptionElements.push(<option key={this.NONE} value={this.NONE}>{this.NONE}</option>);
        } else {
            this.props.selectableNames.forEach((name: string) => {
                channelOptionElements.push(<option value={name} key={name}>{name}</option>);
            });
        }
        return channelOptionElements;
    }

    /**
     * When a channel is selected, callback to a function in the parent component represented by the onSelect prop.
     *
     * @param eventTarget
     */
    private selectChannel(eventTarget: HTMLSelectElement): void {
        const channelName: string = eventTarget.value;
        this.props.onSelect(channelName);
    }

}
