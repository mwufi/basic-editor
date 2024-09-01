'use client'

import { init, tx, id } from '@instantdb/react'
import Schema from './schema'

// ID for app: timothy
const APP_ID = '71186fbd-29c5-4d5f-bc04-68f6120e63c1'

export const db = init<Schema>({ appId: APP_ID, devtool: false })