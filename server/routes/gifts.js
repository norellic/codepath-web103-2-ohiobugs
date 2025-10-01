import express from 'express'
import path from 'path'
import BugsController from '../controllers/bugs.js'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', BugsController.getBugs)

router.get('/:giftId', (req, res) => {
res.status(200).sendFile(path.resolve(__dirname, '../public/gift.html'))
})

export default router
