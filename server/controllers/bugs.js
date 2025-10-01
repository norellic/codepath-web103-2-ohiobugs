//store the controller functions to perform CRUD operations associated with the gbugs table

import { pool } from '../config/database.js'

const getBugs = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM bugs ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
        }
}

export default {
    getBugs
  }