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
import { OutputContents } from "@theia/output/lib/browser/components/output-contents";
import { OutputHeader } from "@theia/output/lib/browser/components/output-header";
import { OutputChannel, OutputChannelManager } from "@theia/output/lib/common/output-channel";

export interface OutputComponentProps {
    outputChannelManager: OutputChannelManager;
    updateWidget: () => void;
}

export interface OutputComponentState {
    selectedChannel: OutputChannel;
}

export class OutputComponent extends React.Component<OutputComponentProps, OutputComponentState> {

    constructor(props: OutputComponentProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <OutputHeader onSelect={this.onSelectChannel} selectableNames={this.getVisibleChannelNames()}/>
                <OutputContents channel={this.state.selectedChannel}/>
            </div>
        );
    }

    private onSelectChannel(selectedChannelName: string) {
        const selectedChannel: OutputChannel = this.props.outputChannelManager.getChannel(selectedChannelName);
        this.setState({selectedChannel: selectedChannel});
        this.props.updateWidget();
    }

    private getVisibleChannelNames(): string[] {
        const visibleChannels: OutputChannel[] = this.props.outputChannelManager.getChannels()
                                                     .filter((channel: OutputChannel) => channel.isVisible);
        return visibleChannels.map(channel => channel.name);
    }

}
