/*
 * Copyright 2020 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CommandHandler, KResponse, ParsedOptions, Registrar } from '@kui-shell/core'
import { cp, rm, mkdir, rmdir } from '../delegates'

/**
 * Generic registration for commands with boolean flags.
 *
 * @param boolean: 'abc' is treated as meaning all of -a, -b, and -c
 * are boolean flags
 *
 */
function withBooleanFlags(
  this: Registrar,
  command: string,
  handler: CommandHandler<KResponse, ParsedOptions>,
  booleans: string
) {
  this.listen(`/${command}`, handler, {
    flags: {
      boolean: booleans.split('')
    }
  })
}

export default function(registrar: Registrar) {
  const on = withBooleanFlags.bind(registrar)

  on(
    'rm',
    args => rm(args, args.argvNoOptions[1], !!(args.parsedOptions.r || args.parsedOptions.R)).then(() => true),
    'frRidPvw'
  )

  on('mkdir', args => mkdir(args, args.argvNoOptions[1]).then(() => true), 'pv')

  on('rmdir', args => rmdir(args, args.argvNoOptions[1]).then(() => true), 'p')

  on('cp', args => cp(args, args.argvNoOptions[1], args.argvNoOptions[2]), 'acfHiLnPpRvX')
}