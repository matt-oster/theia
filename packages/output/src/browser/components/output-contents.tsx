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
import { OutputChannel } from "@theia/output/lib/common/output-channel";

export interface OutputChannelContentProps {
    channel: OutputChannel;
}

export class OutputContents extends React.Component<OutputChannelContentProps, {}> {
    private readonly OUTPUT_CONTENTS_ID = 'outputContents';

    constructor(props: OutputChannelContentProps) {
        super(props);
    }

    public render() {
        return(
            <div id={this.OUTPUT_CONTENTS_ID} className={'theia-output'}>
                {this.props.channel.getLines().map(line => OutputContents.toHtmlText(line))}
            </div>
        );
    }

    private static toHtmlText(text: string): React.ReactNode[] {
        const result: React.ReactNode[] = [];
        if (text) {
            const lines = text.split(/([\n\r]+)/);
            for (const line of lines) {
                result.push(<div>{line}</div>);
            }
        } else {
            result.push(<div>{'<no output yet>'}</div>);
        }
        return result;
    }

}
